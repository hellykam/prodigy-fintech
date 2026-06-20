<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import DbTable from '@/components/DbTable.vue'

const { data, isLoading, error } = useQuery({
  queryKey: ['db-ledger'],
  queryFn: async () => {
    const r = await fetch('/api/ledger?limit=200')
    if (!r.ok) throw new Error('Failed')
    return r.json()
  },
  refetchInterval: 5000,
})
</script>
<template>
  <DbTable
    title="Ledger Entries"
    :rows="data?.items ?? []"
    :is-loading="isLoading"
    :error="error?.message"
    :columns="[
      { key: 'id', label: 'ID', width: '180px' },
      { key: 'type', label: 'Type', type: 'status' },
      { key: 'amount', label: 'Amount', type: 'credit' },
      { key: 'currency', label: 'CCY' },
      { key: 'description', label: 'Description' },
      { key: 'createdAt', label: 'Date', type: 'date' },
    ]"
  />
</template>
