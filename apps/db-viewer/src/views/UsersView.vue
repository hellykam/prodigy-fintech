<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import DbTable from '@/components/DbTable.vue'

const { data, isLoading, error } = useQuery({
  queryKey: ['db-users'],
  queryFn: async () => {
    const r = await fetch('/api/users?limit=200')
    if (!r.ok) throw new Error('Failed')
    return r.json()
  },
  refetchInterval: 5000,
})
</script>
<template>
  <DbTable
    title="Users"
    :rows="data?.items ?? []"
    :is-loading="isLoading"
    :error="error?.message"
    :columns="[
      { key: 'id', label: 'ID', width: '200px' },
      { key: 'email', label: 'Email', width: '220px' },
      { key: 'status', label: 'Status', type: 'status' },
      { key: 'kycStatus', label: 'KYC', type: 'status' },
      { key: 'riskLevel', label: 'Risk', type: 'status' },
      { key: 'createdAt', label: 'Created', type: 'date' },
    ]"
  />
</template>
