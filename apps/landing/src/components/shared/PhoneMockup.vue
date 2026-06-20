<script setup lang="ts">
withDefaults(defineProps<{
  scheme?: 'light' | 'dark'
}>(), {
  scheme: 'light',
})
</script>

<template>
  <div class="phone-outer" :class="scheme">
    <div class="phone-notch" />
    <div class="phone-screen">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.phone-outer {
  position: relative;
  width: 220px;
  height: 440px;
  border-radius: 36px;
  border: 8px solid #e2e0f0;
  box-shadow:
    0 24px 48px rgba(0, 0, 0, 0.18),
    0 4px 12px rgba(0, 0, 0, 0.1),
    inset 0 0 0 1px rgba(255, 255, 255, 0.2);
  overflow: hidden;
  background: white;
}

.phone-outer.dark {
  border-color: #1a1a2e;
  background: #0a0a0a;
  box-shadow:
    0 24px 48px rgba(0, 0, 0, 0.5),
    0 4px 12px rgba(0, 0, 0, 0.3),
    inset 0 0 0 1px rgba(255, 255, 255, 0.05);
}

.phone-notch {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 20px;
  background: #e2e0f0;
  border-radius: 0 0 16px 16px;
  z-index: 10;
}

.phone-outer.dark .phone-notch {
  background: #1a1a2e;
}

.phone-screen {
  width: 100%;
  height: 100%;
  border-radius: 28px;
  overflow: hidden;
  background: white;
}

.phone-outer.dark .phone-screen {
  background: #0a0a0a;
}
</style>
