<template>
  <canvas ref="canvas" class="three-bg" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const canvas = ref<HTMLCanvasElement | null>(null)
let animId = 0
let renderer: THREE.WebGLRenderer | null = null

onMounted(() => {
  if (!canvas.value) return
  const el = canvas.value
  const W = el.parentElement?.clientWidth || window.innerWidth
  const H = el.parentElement?.clientHeight || 700

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
  camera.position.z = 8

  renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  // Create falling particles
  const COUNT = 200
  const positions = new Float32Array(COUNT * 3)
  const speeds = new Float32Array(COUNT)

  for (let i = 0; i < COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 14  // x spread
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12  // y start random
    positions[i * 3 + 2] = (Math.random() - 0.5) * 3   // z depth
    speeds[i]    = 0.01 + Math.random() * 0.025
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

  const mat = new THREE.PointsMaterial({
    color: 0xf59e0b,
    size: 0.07,
    transparent: true,
    opacity: 0.6,
    sizeAttenuation: true,
  })

  const particles = new THREE.Points(geo, mat)
  scene.add(particles)

  // Bright accent particles (fewer, more visible)
  const ACCENT = 30
  const aPos = new Float32Array(ACCENT * 3)
  const aSpeeds = new Float32Array(ACCENT)
  for (let i = 0; i < ACCENT; i++) {
    aPos[i * 3]     = (Math.random() - 0.5) * 14
    aPos[i * 3 + 1] = (Math.random() - 0.5) * 12
    aPos[i * 3 + 2] = (Math.random() - 0.5) * 2
    aSpeeds[i] = 0.008 + Math.random() * 0.015
  }
  const aGeo = new THREE.BufferGeometry()
  aGeo.setAttribute('position', new THREE.BufferAttribute(aPos, 3))
  const aMat = new THREE.PointsMaterial({ color: 0xfbbf24, size: 0.12, transparent: true, opacity: 0.9 })
  const accents = new THREE.Points(aGeo, aMat)
  scene.add(accents)

  const BOTTOM = -6
  const TOP = 6

  const animate = () => {
    animId = requestAnimationFrame(animate)

    // Rain fall
    for (let i = 0; i < COUNT; i++) {
      positions[i * 3 + 1]! -= speeds[i]!
      if (positions[i * 3 + 1]! < BOTTOM) {
        positions[i * 3 + 1]! = TOP
        positions[i * 3]! = (Math.random() - 0.5) * 14
      }
    }
    ;(geo.attributes['position'] as THREE.BufferAttribute).needsUpdate = true

    for (let i = 0; i < ACCENT; i++) {
      aPos[i * 3 + 1]! -= aSpeeds[i]!
      if (aPos[i * 3 + 1]! < BOTTOM) {
        aPos[i * 3 + 1]! = TOP
        aPos[i * 3]! = (Math.random() - 0.5) * 14
      }
    }
    ;(aGeo.attributes['position'] as THREE.BufferAttribute).needsUpdate = true

    // Very slow scene rotation for depth feel
    scene.rotation.y += 0.0003

    renderer!.render(scene, camera)
  }
  animate()

  const onResize = () => {
    const w = el.parentElement?.clientWidth || window.innerWidth
    const h = el.parentElement?.clientHeight || 700
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer!.setSize(w, h)
  }
  window.addEventListener('resize', onResize)
  ;(el as any).__cleanup = () => window.removeEventListener('resize', onResize)
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  ;(canvas.value as any)?.__cleanup?.()
  renderer?.dispose()
})
</script>

<style scoped>
.three-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}
</style>
