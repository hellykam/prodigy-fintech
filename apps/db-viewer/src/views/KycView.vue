<script setup lang="ts">
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import DbTable from '@/components/DbTable.vue'

const qc = useQueryClient()
const { data, isLoading, error } = useQuery({
  queryKey: ['db-kyc'],
  queryFn: async () => {
    const r = await fetch('/api/kyc/applicants?limit=200')
    if (!r.ok) throw new Error('Failed')
    return r.json()
  },
  refetchInterval: 5000,
})

const approveMutation = useMutation({
  mutationFn: (id: string) => fetch(`/api/kyc/${id}/approve`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}' }),
  onSuccess: () => qc.invalidateQueries({ queryKey: ['db-kyc'] }),
})
const rejectMutation = useMutation({
  mutationFn: (id: string) => fetch(`/api/kyc/${id}/reject`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ reason: 'Admin decision' }) }),
  onSuccess: () => qc.invalidateQueries({ queryKey: ['db-kyc'] }),
})
</script>
<template>
  <div>
    <DbTable
      title="KYC Applicants"
      :rows="data?.items ?? []"
      :is-loading="isLoading"
      :error="error?.message"
      :columns="[
        { key: 'id', label: 'ID', width: '180px' },
        { key: 'userId', label: 'User ID', width: '180px' },
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'country', label: 'Country' },
        { key: 'status', label: 'Status', type: 'status' },
        { key: 'createdAt', label: 'Submitted', type: 'date' },
      ]"
    />
    <!-- Action buttons per applicant -->
    <div v-if="data?.items" style="padding:0 24px 24px">
      <div v-for="app in data.items.filter((a: any) => a.status === 'pending')" :key="app.id"
        style="display:flex;align-items:center;gap:12px;padding:8px 0;border-bottom:1px solid #1E2A3B">
        <span style="font-size:11px;color:#94A3B8;flex:1">{{ app.userId }}</span>
        <button @click="approveMutation.mutate(app.id)"
          style="background:#064E3B;color:#34D399;border:1px solid #34D399;padding:4px 12px;border-radius:4px;font-size:11px;cursor:pointer;font-family:inherit">
          APPROVE
        </button>
        <button @click="rejectMutation.mutate(app.id)"
          style="background:#450A0A;color:#F87171;border:1px solid #F87171;padding:4px 12px;border-radius:4px;font-size:11px;cursor:pointer;font-family:inherit">
          REJECT
        </button>
      </div>
    </div>
  </div>
</template>
