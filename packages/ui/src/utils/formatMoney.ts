export function formatMoney(amount: number, currency: string, locale = 'en-DE'): string {
  if (currency === 'BTC' || currency === 'ETH') {
    return formatCrypto(amount, currency)
  }
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function formatCrypto(amount: number, currency: string): string {
  const decimals = currency === 'BTC' ? 8 : currency === 'ETH' ? 6 : 2
  return `${amount.toFixed(decimals)} ${currency}`
}
