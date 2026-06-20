<template>
  <AnimatedCursor />
  <div class="scroll-progress" :style="{ width: scrollPct + '%' }" aria-hidden="true" />
  <RouterView v-slot="{ Component }">
    <Transition name="page-fade" mode="out-in">
      <component :is="Component" :key="$route.path" />
    </Transition>
  </RouterView>
  <button
    v-if="showBackToTop"
    class="back-to-top"
    @click="scrollToTop"
    aria-label="Back to top"
  >↑</button>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import AnimatedCursor from '@/components/shared/AnimatedCursor.vue'
const scrollPct = ref(0)
const showBackToTop = ref(false)
function onScroll() {
  const h = document.documentElement
  scrollPct.value = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100
  showBackToTop.value = h.scrollTop > 400
}
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onUnmounted(() => window.removeEventListener('scroll', onScroll))
</script>

<style>
.scroll-progress {
  position: fixed;
  top: 0; left: 0;
  height: 3px;
  background: linear-gradient(90deg, #4f46e5, #a855f7);
  z-index: 9999;
  transition: width 0.1s linear;
  pointer-events: none;
}

.page-fade-enter-active,
.page-fade-leave-active { transition: opacity 0.2s ease; }
.page-fade-enter-from,
.page-fade-leave-to { opacity: 0; }

.back-to-top {
  position: fixed;
  bottom: 2rem; right: 2rem;
  width: 40px; height: 40px;
  border-radius: 50%;
  background: rgba(255,255,255,0.1);
  backdrop-filter: blur(8px);
  border: 1px solid rgba(255,255,255,0.15);
  color: #fff;
  font-size: 1rem;
  cursor: pointer;
  z-index: 999;
  display: flex; align-items: center; justify-content: center;
  transition: opacity 0.3s ease, transform 0.3s ease, background 0.2s ease;
}
.back-to-top:hover { background: rgba(255,255,255,0.2); transform: translateY(-2px); }
</style>
