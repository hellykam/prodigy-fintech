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
  const camera = new THREE.PerspectiveCamera(55, W / H, 0.1, 100)
  camera.position.z = 6

  renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  // Generate sphere surface points with color gradient
  const COUNT = 2500
  const positions = new Float32Array(COUNT * 3)
  const colors = new Float32Array(COUNT * 3)
  const basePositions = new Float32Array(COUNT * 3) // for morphing

  const colorA = new THREE.Color(0xa855f7) // purple
  const colorB = new THREE.Color(0xec4899) // pink
  const colorC = new THREE.Color(0x6366f1) // indigo

  for (let i = 0; i < COUNT; i++) {
    // Fibonacci sphere distribution
    const theta = Math.acos(1 - (2 * (i + 0.5)) / COUNT)
    const phi = Math.PI * (1 + Math.sqrt(5)) * i

    const radius = 2.5
    const x = radius * Math.sin(theta) * Math.cos(phi)
    const y = radius * Math.sin(theta) * Math.sin(phi)
    const z = radius * Math.cos(theta)

    positions[i * 3] = x
    positions[i * 3 + 1] = y
    positions[i * 3 + 2] = z
    basePositions[i * 3] = x
    basePositions[i * 3 + 1] = y
    basePositions[i * 3 + 2] = z

    // Color: blend based on y position
    const t = (y / radius + 1) / 2  // 0 to 1
    const mixed = t < 0.5
      ? colorA.clone().lerp(colorB, t * 2)
      : colorB.clone().lerp(colorC, (t - 0.5) * 2)

    colors[i * 3]     = mixed.r
    colors[i * 3 + 1] = mixed.g
    colors[i * 3 + 2] = mixed.b
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))

  const mat = new THREE.PointsMaterial({
    vertexColors: true,
    size: 0.04,
    transparent: true,
    opacity: 0.7,
    sizeAttenuation: true,
  })

  const sphere = new THREE.Points(geo, mat)
  scene.add(sphere)

  // Mouse parallax
  let mouseX = 0, mouseY = 0
  const onMouse = (e: MouseEvent) => {
    mouseX = (e.clientX / window.innerWidth - 0.5)
    mouseY = (e.clientY / window.innerHeight - 0.5)
  }
  window.addEventListener('mousemove', onMouse)

  let t = 0
  const animate = () => {
    animId = requestAnimationFrame(animate)
    t += 0.008

    // Morph sphere — slightly displace each vertex with sine wave
    for (let i = 0; i < COUNT; i++) {
      const bx = basePositions[i * 3] ?? 0
      const by = basePositions[i * 3 + 1] ?? 0
      const bz = basePositions[i * 3 + 2] ?? 0
      const len = Math.sqrt(bx*bx + by*by + bz*bz)
      const displacement = 1 + 0.08 * Math.sin(t + by * 1.5)
      positions[i * 3]!     = bx / len * 2.5 * displacement
      positions[i * 3 + 1]! = by / len * 2.5 * displacement
      positions[i * 3 + 2]! = bz / len * 2.5 * displacement
    }
    ;(geo.attributes['position'] as THREE.BufferAttribute).needsUpdate = true

    // Auto rotate + mouse
    sphere.rotation.y += 0.003 + mouseX * 0.005
    sphere.rotation.x += 0.001 + mouseY * 0.003

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
  ;(el as any).__cleanup = () => {
    window.removeEventListener('mousemove', onMouse)
    window.removeEventListener('resize', onResize)
  }
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
