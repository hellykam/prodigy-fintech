<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import DbTable from '@/components/DbTable.vue'

const { data, isLoading, error } = useQuery({
  queryKey: ['db-b2b'],
  queryFn: async () => {
    const r = await fetch('/api/b2b-clients?limit=100')
    if (!r.ok) throw new Error('Failed')
    return r.json()
  },
})
</script>
<template>
  <DbTable
    title="B2B Clients"
    :rows="data?.items ?? []"
    :is-loading="isLoading"
    :error="error?.message"
    :columns="[
      { key: 'id', label: 'ID', width: '200px' },
      { key: 'name', label: 'Name' },
      { key: 'status', label: 'Status', type: 'status' },
      { key: 'commissionSharePercent', label: 'Commission %' },
      { key: 'platformFeePercent', label: 'Platform Fee %' },
      { key: 'createdAt', label: 'Created', type: 'date' },
    ]"
  />
</template>
