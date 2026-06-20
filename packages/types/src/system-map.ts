export interface SystemEvent {
  id: string
  correlationId: string
  eventName: string
  entityType: string
  entityId: string
  source: string
  target: string
  status: 'processing' | 'waiting' | 'completed' | 'failed' | 'rejected'
  payload: Record<string, unknown>
  createdAt: string
}

export type NodeName =
  | 'consumer-app'
  | 'widget'
  | 'admin'
  | 'partner-portal'
  | 'sumsub-simulator'
  | 'risk-engine'
  | 'market-simulator'
  | 'bank-simulator'
  | 'ledger'
  | 'database'
  | 'kyc-simulator'

export type EventName =
  | 'USER_SIGNED_UP'
  | 'USER_LOGGED_IN'
  | 'WIDGET_LOADED'
  | 'WIDGET_CONFIG_RESOLVED'
  | 'QUOTE_REQUESTED'
  | 'QUOTE_CREATED'
  | 'QUOTE_ACCEPTED'
  | 'QUOTE_EXPIRED'
  | 'KYC_APPLICANT_CREATED'
  | 'KYC_SUBMITTED'
  | 'KYC_APPROVED'
  | 'KYC_REJECTED'
  | 'KYC_MANUAL_REVIEW_REQUESTED'
  | 'BANK_ACCOUNT_CREATED'
  | 'IBAN_ASSIGNED'
  | 'TRANSACTION_CREATED'
  | 'TRANSACTION_RISK_CHECK_STARTED'
  | 'TRANSACTION_RISK_APPROVED'
  | 'TRANSACTION_RISK_REVIEW_REQUIRED'
  | 'TRANSACTION_RISK_REJECTED'
  | 'MANUAL_REVIEW_CREATED'
  | 'MANUAL_REVIEW_APPROVED'
  | 'MANUAL_REVIEW_REJECTED'
  | 'MARKET_ORDER_REQUESTED'
  | 'MARKET_ORDER_EXECUTED'
  | 'MARKET_ORDER_FAILED'
  | 'LEDGER_POSTING_STARTED'
  | 'LEDGER_POSTED'
  | 'LEDGER_POSTING_FAILED'
  | 'PARTNER_COMMISSION_ACCRUED'
  | 'TRANSACTION_COMPLETED'
  | 'TRANSACTION_FAILED'
  | 'MARKET_PRICE_UPDATED'
  | 'ADMIN_APPROVED_MANUAL_REVIEW'
  | 'ADMIN_REJECTED_MANUAL_REVIEW'
  | 'ADMIN_APPROVED_KYC'
  | 'ADMIN_REJECTED_KYC'
