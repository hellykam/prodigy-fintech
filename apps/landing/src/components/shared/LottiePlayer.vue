<template>
  <div ref="container" :style="{ width: size, height: size }" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import lottie, { type AnimationItem } from 'lottie-web'

const props = withDefaults(defineProps<{
  animationData: object
  loop?: boolean
  autoplay?: boolean
  size?: string
}>(), {
  loop: true,
  autoplay: true,
  size: '120px',
})

const container = ref<HTMLElement | null>(null)
let anim: AnimationItem | null = null

onMounted(() => {
  if (!container.value) return
  anim = lottie.loadAnimation({
    container: container.value,
    renderer: 'svg',
    loop: props.loop,
    autoplay: props.autoplay,
    animationData: props.animationData,
  })
})

watch(() => props.animationData, () => {
  anim?.destroy()
  if (!container.value) return
  anim = lottie.loadAnimation({
    container: container.value,
    renderer: 'svg',
    loop: props.loop,
    autoplay: props.autoplay,
    animationData: props.animationData,
  })
})

onUnmounted(() => anim?.destroy())
</script>
