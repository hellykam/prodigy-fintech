<script setup lang="ts">
interface BreadcrumbItem {
  label: string
  href?: string
}

interface Props {
  items: BreadcrumbItem[]
}

defineProps<Props>()
</script>

<template>
  <nav aria-label="Breadcrumb">
    <ol class="flex flex-wrap items-center gap-2">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="flex items-center gap-2"
      >
        <!-- Divider (not before first item) -->
        <span
          v-if="index > 0"
          class="text-sm text-slate-300 select-none"
          aria-hidden="true"
        >
          /
        </span>

        <!-- Last item (current page) — plain text -->
        <span
          v-if="index === items.length - 1"
          class="text-sm font-medium text-slate-900"
          aria-current="page"
        >
          {{ item.label }}
        </span>

        <!-- Item with href — anchor link (right-click to open in new tab) -->
        <a
          v-else-if="item.href"
          :href="item.href"
          class="text-sm text-brand-600 hover:text-brand-700 transition-colors focus-visible:outline-none focus-visible:rounded focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-1"
        >
          {{ item.label }}
        </a>

        <!-- Item without href and not last — non-navigable intermediate -->
        <span
          v-else
          class="text-sm font-medium text-slate-900"
        >
          {{ item.label }}
        </span>
      </li>
    </ol>
  </nav>
</template>
