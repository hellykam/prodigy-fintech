<script setup lang="ts">
import Badge from './Badge.vue'

interface Props {
  status: string
}

defineProps<Props>()

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'neutral'

const statusMap: Record<string, { variant: BadgeVariant; label: string }> = {
  // KYC
  approved: { variant: 'success', label: 'Approved' },
  rejected: { variant: 'danger', label: 'Rejected' },
  pending: { variant: 'warning', label: 'Pending' },
  manual_review: { variant: 'info', label: 'Manual Review' },
  not_started: { variant: 'neutral', label: 'Not Started' },
  // Transactions
  completed: { variant: 'success', label: 'Completed' },
  failed: { variant: 'danger', label: 'Failed' },
  created: { variant: 'neutral', label: 'Created' },
  risk_checking: { variant: 'info', label: 'Risk Check' },
  market_executing: { variant: 'info', label: 'Executing' },
  ledger_posting: { variant: 'info', label: 'Posting' },
  // User
  active: { variant: 'success', label: 'Active' },
  suspended: { variant: 'warning', label: 'Suspended' },
  banned: { variant: 'danger', label: 'Banned' },
}

function resolve(status: string) {
  return statusMap[status] ?? { variant: 'neutral' as BadgeVariant, label: status }
}
</script>

<template>
  <Badge :variant="resolve(status).variant">{{ resolve(status).label }}</Badge>
</template>
