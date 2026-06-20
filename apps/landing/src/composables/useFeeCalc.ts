import { ref, computed } from 'vue'

export function useFeeCalc() {
  const amount = ref(500)
  const pair = ref('EUR→BTC')
  const markup = ref(0.5)

  const platformFeeRate = 0.025
  const partnerMarkupRate = computed(() => markup.value / 100)
  const networkFee = computed(() => pair.value.includes('BTC') ? 2.5 : 0.8)

  const platformFee = computed(() => amount.value * platformFeeRate)
  const markupFee = computed(() => amount.value * partnerMarkupRate.value)
  const total = computed(() => platformFee.value + markupFee.value + networkFee.value)
  const youReceive = computed(() => amount.value - total.value)

  const rate = computed(() => {
    if (pair.value === 'EUR→BTC') return 0.0000098
    if (pair.value === 'EUR→ETH') return 0.00038
    return 1.0
  })
  const cryptoAmount = computed(() => youReceive.value * rate.value)

  return { amount, pair, markup, platformFee, markupFee, networkFee, total, youReceive, cryptoAmount }
}
