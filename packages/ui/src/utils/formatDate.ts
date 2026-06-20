export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
  }).format(new Date(iso))
}

export function formatDateTime(iso: string): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit',
  }).format(new Date(iso))
}

export function formatRelative(iso: string): string {
  const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })
  const diff = Date.now() - new Date(iso).getTime()
  if (diff < 60_000) return 'just now'
  if (diff < 3_600_000) return rtf.format(-Math.floor(diff / 60_000), 'minute')
  if (diff < 86_400_000) return rtf.format(-Math.floor(diff / 3_600_000), 'hour')
  return rtf.format(-Math.floor(diff / 86_400_000), 'day')
}
