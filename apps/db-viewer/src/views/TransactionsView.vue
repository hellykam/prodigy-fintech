<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import DbTable from '@/components/DbTable.vue'

const { data, isLoading, error } = useQuery({
  queryKey: ['db-tx'],
  queryFn: async () => {
    const r = await fetch('/api/transactions?limit=200')
    if (!r.ok) throw new Error('Failed')
    return r.json()
  },
  refetchInterval: 3000,
})
</script>
<template>
  <DbTable
    title="Transactions"
    :rows="data?.items ?? []"
    :is-loading="isLoading"
    :error="error?.message"
    :columns="[
      { key: 'id', label: 'ID', width: '180px' },
      { key: 'userId', label: 'User ID', width: '180px' },
      { key: 'sourceCurrency', label: 'From', width: '60px' },
      { key: 'targetCurrency', label: 'To', width: '60px' },
      { key: 'sourceAmount', label: 'Source Amt', type: 'debit' },
      { key: 'targetAmount', label: 'Target Amt', type: 'credit' },
      { key: 'status', label: 'Status', type: 'status' },
      { key: 'riskScore', label: 'Risk' },
      { key: 'createdAt', label: 'Created', type: 'date' },
    ]"
  />
</template>
