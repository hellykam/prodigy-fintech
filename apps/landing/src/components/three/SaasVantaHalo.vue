<template>
  <div ref="container" class="vanta-bg" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const container = ref<HTMLElement | null>(null)
let effect: any = null

onMounted(async () => {
  if (!container.value) return

  try {
    // Dynamically import Vanta to avoid SSR issues
    const VANTA = (await import('vanta/dist/vanta.halo.min')) as any
    const VantaHalo = VANTA.default ?? VANTA

    effect = VantaHalo({
      el: container.value,
      THREE,
      mouseControls: true,
      touchControls: true,
      minHeight: 200,
      minWidth: 200,
      baseColor: 0x0f172a,
      backgroundColor: 0x0f172a,
      amplitudeFactor: 2.0,
      xOffset: 0.1,
      yOffset: -0.1,
      size: 1.5,
    })
  } catch {
    // Fallback: pure Three.js soft sphere of points
    const el = container.value
    const W = el.clientWidth || window.innerWidth
    const H = el.clientHeight || 700

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
    camera.position.z = 6

    const fallbackRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    fallbackRenderer.setSize(W, H)
    fallbackRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    fallbackRenderer.setClearColor(0x0f172a, 1)
    el.appendChild(fallbackRenderer.domElement)
    Object.assign(fallbackRenderer.domElement.style, {
      position: 'absolute',
      inset: '0',
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
    })

    const geo = new THREE.SphereGeometry(3, 32, 32)
    const mat = new THREE.PointsMaterial({ color: 0x6366f1, size: 0.04, transparent: true, opacity: 0.4 })
    const sphere = new THREE.Points(geo, mat)
    scene.add(sphere)

    let animId = 0
    const animate = () => {
      animId = requestAnimationFrame(animate)
      sphere.rotation.y += 0.001
      sphere.rotation.x += 0.0005
      fallbackRenderer.render(scene, camera)
    }
    animate()

    effect = {
      destroy: () => {
        cancelAnimationFrame(animId)
        fallbackRenderer.dispose()
        el.removeChild(fallbackRenderer.domElement)
      },
    }
  }
})

onUnmounted(() => {
  effect?.destroy()
})
</script>

<style scoped>
.vanta-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
