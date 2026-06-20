import { initMarket } from './market.js'
import { initBank } from './bank.js'
import { initKyc } from './kyc.js'
import { initRisk } from './risk.js'
import { initLedger } from './ledger.js'
import { initCommission } from './commission.js'
import { initQuotes } from './quotes.js'

export async function initSimulators() {
  console.log('[simulators] initializing...')
  initMarket()
  initBank()
  initKyc()
  initRisk()
  initLedger()
  initCommission()
  initQuotes()
  console.log('[simulators] all ready')
}
