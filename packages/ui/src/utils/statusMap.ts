export interface StatusConfig {
  label: string
  variant: 'success' | 'danger' | 'warning' | 'info' | 'neutral'
}

export const STATUS_MAP: Record<string, StatusConfig> = {
  completed:     { label: 'Completed',    variant: 'success' },
  pending:       { label: 'Pending',      variant: 'warning' },
  processing:    { label: 'Processing',   variant: 'info' },
  failed:        { label: 'Failed',       variant: 'danger' },
  rejected:      { label: 'Rejected',     variant: 'danger' },
  manual_review: { label: 'Manual Review', variant: 'warning' },
  risk_review:   { label: 'Risk Review',  variant: 'warning' },
  not_started:   { label: 'Not Started',  variant: 'neutral' },
  in_progress:   { label: 'In Progress',  variant: 'info' },
  approved:      { label: 'Approved',     variant: 'success' },
  active:        { label: 'Active',       variant: 'success' },
  suspended:     { label: 'Suspended',    variant: 'danger' },
  settled:       { label: 'Settled',      variant: 'success' },
  operational:   { label: 'Operational',  variant: 'success' },
  degraded:      { label: 'Degraded',     variant: 'warning' },
  offline:       { label: 'Offline',      variant: 'danger' },
  cancelled:     { label: 'Cancelled',    variant: 'neutral' },
  open:          { label: 'Open',         variant: 'warning' },
  resolved:      { label: 'Resolved',     variant: 'success' },
}

export function getStatus(status: string): StatusConfig {
  return STATUS_MAP[status] ?? { label: status, variant: 'neutral' }
}
