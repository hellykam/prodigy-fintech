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
  const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
  camera.position.z = 5

  renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  // Icosahedron wireframe
  const geo = new THREE.IcosahedronGeometry(2.5, 1)
  const mat = new THREE.MeshBasicMaterial({
    color: 0x2563eb,
    wireframe: true,
    transparent: true,
    opacity: 0.55,
  })
  const mesh = new THREE.Mesh(geo, mat)
  scene.add(mesh)

  // Inner sphere for depth
  const innerGeo = new THREE.IcosahedronGeometry(1.6, 0)
  const innerMat = new THREE.MeshBasicMaterial({
    color: 0xec4899,
    wireframe: true,
    transparent: true,
    opacity: 0.3,
  })
  const inner = new THREE.Mesh(innerGeo, innerMat)
  scene.add(inner)

  // Color cycle
  const colors = [0x2563eb, 0xec4899, 0x84cc16, 0x2563eb]
  const colorObjs = colors.map((c) => new THREE.Color(c))
  let colorT = 0

  // Mouse
  let mouseX = 0
  let mouseY = 0
  const onMouse = (e: MouseEvent) => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 2
    mouseY = (e.clientY / window.innerHeight - 0.5) * 2
  }
  window.addEventListener('mousemove', onMouse)

  let t = 0
  const animate = () => {
    animId = requestAnimationFrame(animate)
    t += 0.01

    // Slow auto rotation + mouse influence
    mesh.rotation.y += 0.004 + mouseX * 0.001
    mesh.rotation.x += 0.002 + mouseY * 0.001
    inner.rotation.y -= 0.006
    inner.rotation.z += 0.003

    // Scale pulse
    const pulse = 1 + 0.04 * Math.sin(t)
    mesh.scale.setScalar(pulse)

    // Color cycle
    colorT += 0.002
    const idx = Math.floor(colorT) % (colorObjs.length - 1)
    const frac = colorT - Math.floor(colorT)
    const blended = colorObjs[idx]!.clone().lerp(colorObjs[idx + 1]!, frac)
    ;(mat as THREE.MeshBasicMaterial).color.set(blended)

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

  ;(el as HTMLCanvasElement & { __cleanup?: () => void }).__cleanup = () => {
    window.removeEventListener('mousemove', onMouse)
    window.removeEventListener('resize', onResize)
  }
})

onUnmounted(() => {
  cancelAnimationFrame(animId)
  ;(canvas.value as (HTMLCanvasElement & { __cleanup?: () => void }) | null)?.__cleanup?.()
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
