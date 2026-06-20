<script setup lang="ts">
interface Breadcrumb {
  label: string
  href?: string
}

interface Props {
  breadcrumbs?: Breadcrumb[]
  adminEmail?: string
  lastLogin?: string
}

withDefaults(defineProps<Props>(), {
  breadcrumbs: () => [],
})
</script>

<template>
  <header
    class="sticky top-0 z-10 flex h-14 items-center justify-between border-b border-slate-200 bg-white px-6"
  >
    <!-- Left: breadcrumbs -->
    <nav aria-label="Breadcrumb" class="flex min-w-0 items-center gap-1.5 text-sm">
      <template v-for="(crumb, idx) in breadcrumbs" :key="crumb.label">
        <!-- Separator -->
        <span
          v-if="idx > 0"
          class="text-slate-400"
          aria-hidden="true"
        >›</span>

        <!-- Prior levels: links -->
        <a
          v-if="crumb.href && idx < breadcrumbs.length - 1"
          :href="crumb.href"
          class="truncate text-brand-600 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
        >
          {{ crumb.label }}
        </a>

        <!-- Current page: plain text (last item) -->
        <span
          v-else
          class="truncate font-medium text-slate-900"
          :aria-current="idx === breadcrumbs.length - 1 ? 'page' : undefined"
        >
          {{ crumb.label }}
        </span>
      </template>
    </nav>

    <!-- Right: actions slot + admin info -->
    <div class="flex shrink-0 items-center gap-4">
      <slot name="actions" />

      <!-- Admin info — hidden on small screens -->
      <div
        v-if="adminEmail || lastLogin"
        class="hidden items-center gap-3 border-l border-slate-200 pl-4 lg:flex"
      >
        <div v-if="adminEmail || lastLogin" class="text-right">
          <p v-if="adminEmail" class="text-xs font-medium text-slate-700">{{ adminEmail }}</p>
          <p v-if="lastLogin" class="text-xs text-slate-400">Last login: {{ lastLogin }}</p>
        </div>
      </div>
    </div>
  </header>
</template>
