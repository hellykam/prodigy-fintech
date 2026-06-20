<script setup lang="ts">
import { RouterView } from 'vue-router'
import Toast from '@/components/Toast.vue'
</script>

<template>
  <Toast />
  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.page-enter-from {
  opacity: 0;
  transform: translateX(16px);
}
.page-leave-to {
  opacity: 0;
  transform: translateX(-16px);
}

* {
  -webkit-tap-highlight-color: transparent;
}
</style>
