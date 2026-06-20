import { nanoid } from 'nanoid'
import { db } from '../db.js'
import { eventBus, makeEvent } from './events.js'
import { scoreTransaction, createManualReview } from './risk.js'
import { executeOrder } from './market.js'
import { post, findOrCreateAccount } from './ledger.js'
import { accrueCommission } from './commission.js'

export async function processTransaction(transactionId: string) {
  const txn = await db.transaction.findUniqueOrThrow({ where: { id: transactionId } })
  const correlationId = transactionId

  // ── 1. Risk check ──────────────────────────────────────────────────────────
  const risk = await scoreTransaction(
    transactionId, txn.userId, txn.sourceAmount, txn.sourceCurrency, correlationId,
  )

  await db.transaction.update({
    where: { id: transactionId },
    data: { riskScore: risk.score, riskDecision: risk.decision },
  })

  if (risk.decision === 'rejected') {
    await db.transaction.update({ where: { id: transactionId }, data: { status: 'rejected' } })
    eventBus.emit(makeEvent({
      id: `evt_${nanoid(10)}`,
      correlationId,
      eventName: 'TRANSACTION_FAILED',
      entityType: 'transaction',
      entityId: transactionId,
      source: 'risk-engine',
      target: 'consumer-app',
      status: 'rejected',
      payload: { reason: 'risk_rejected', score: risk.score, reasons: risk.reasons },
    }))
    return
  }

  if (risk.decision === 'manual_review') {
    await db.transaction.update({ where: { id: transactionId }, data: { status: 'manual_review' } })
    await createManualReview(transactionId, txn.userId, risk.score, risk.reasons, correlationId)
    return
  }

  await runMarketAndSettle(transactionId, correlationId)
}

// Called both after initial approval and after admin approves a manual review
export async function runMarketAndSettle(transactionId: string, correlationId: string) {
  const txn = await db.transaction.findUniqueOrThrow({ where: { id: transactionId } })

  // ── 2. Market execution ────────────────────────────────────────────────────
  await db.transaction.update({ where: { id: transactionId }, data: { status: 'market_executing' } })

  const isBuy = ['BTC', 'ETH', 'USDT'].includes(txn.targetCurrency)
  const cryptoCurrency = isBuy ? txn.targetCurrency : txn.sourceCurrency
  const side: 'buy' | 'sell' = isBuy ? 'buy' : 'sell'

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'MARKET_ORDER_REQUESTED',
    entityType: 'transaction',
    entityId: transactionId,
    source: 'ledger',
    target: 'market-simulator',
    status: 'processing',
    payload: { cryptoCurrency, side, sourceAmount: txn.sourceAmount },
  }))

  const order = executeOrder(cryptoCurrency, txn.sourceAmount, side)

  if (!order.success) {
    await db.transaction.update({
      where: { id: transactionId },
      data: { status: 'failed', failureReason: order.failureReason },
    })
    eventBus.emit(makeEvent({
      id: `evt_${nanoid(10)}`,
      correlationId,
      eventName: 'MARKET_ORDER_FAILED',
      entityType: 'transaction',
      entityId: transactionId,
      source: 'market-simulator',
      target: 'consumer-app',
      status: 'failed',
      payload: { reason: order.failureReason },
    }))
    return
  }

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'MARKET_ORDER_EXECUTED',
    entityType: 'transaction',
    entityId: transactionId,
    source: 'market-simulator',
    target: 'ledger',
    status: 'completed',
    payload: { executedPrice: order.executedPrice, executedAmount: order.executedAmount },
  }))

  await db.transaction.update({
    where: { id: transactionId },
    data: { targetAmount: order.executedAmount, status: 'ledger_posting' },
  })

  // ── 3. Ledger posting ──────────────────────────────────────────────────────
  const userFiatAccountId = await findOrCreateAccount(
    'user', txn.userId, txn.sourceCurrency, 'asset', `User fiat (${txn.sourceCurrency})`
  )
  const platformClearingId = await findOrCreateAccount(
    'platform', 'platform', txn.sourceCurrency, 'clearing', `Platform clearing (${txn.sourceCurrency})`
  )
  const platformCryptoId = await findOrCreateAccount(
    'platform', 'platform', txn.targetCurrency, 'asset', `Platform crypto (${txn.targetCurrency})`
  )
  const userCryptoAccountId = await findOrCreateAccount(
    'user', txn.userId, txn.targetCurrency, 'asset', `User crypto (${txn.targetCurrency})`
  )

  await post(transactionId, [
    { ledgerAccountId: userFiatAccountId,   direction: 'credit', amount: txn.sourceAmount,      currency: txn.sourceCurrency, description: 'Fiat out — conversion' },
    { ledgerAccountId: platformClearingId,  direction: 'debit',  amount: txn.sourceAmount,      currency: txn.sourceCurrency, description: 'Fiat in — platform clearing' },
    { ledgerAccountId: platformCryptoId,    direction: 'credit', amount: order.executedAmount,  currency: txn.targetCurrency, description: 'Crypto out — market fill' },
    { ledgerAccountId: userCryptoAccountId, direction: 'debit',  amount: order.executedAmount,  currency: txn.targetCurrency, description: 'Crypto in — user wallet' },
  ], correlationId)

  await db.wallet.updateMany({
    where: { userId: txn.userId, currency: txn.targetCurrency },
    data: { balance: { increment: order.executedAmount } },
  })

  // ── 4. Partner commission ──────────────────────────────────────────────────
  if (txn.b2bClientId) {
    const client = await db.b2BClient.findUnique({ where: { id: txn.b2bClientId } })
    if (client) {
      const commissionAmount = txn.sourceAmount * (client.commissionSharePercent / 100)
      await accrueCommission(transactionId, txn.b2bClientId, commissionAmount, txn.sourceCurrency, correlationId)
    }
  }

  // ── 5. Complete ────────────────────────────────────────────────────────────
  await db.transaction.update({ where: { id: transactionId }, data: { status: 'completed' } })

  eventBus.emit(makeEvent({
    id: `evt_${nanoid(10)}`,
    correlationId,
    eventName: 'TRANSACTION_COMPLETED',
    entityType: 'transaction',
    entityId: transactionId,
    source: 'ledger',
    target: 'consumer-app',
    status: 'completed',
    payload: {
      userId: txn.userId,
      sourceCurrency: txn.sourceCurrency,
      targetCurrency: txn.targetCurrency,
      sourceAmount: txn.sourceAmount,
      targetAmount: order.executedAmount,
    },
  }))
}
