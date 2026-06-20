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
  camera.position.z = 7

  renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  // Create 5 floating planes
  const planes: { mesh: THREE.Mesh; vx: number; vy: number; rx: number; ry: number }[] = []

  const configs = [
    { w: 4, h: 0.8, x: -2,   y: 1.5,  z: -1,   op: 0.06, color: 0x0a0a0a },
    { w: 3, h: 2,   x: 2.5,  y: -0.5, z: -2,   op: 0.04, color: 0x34d399 },
    { w: 5, h: 0.4, x: -1,   y: -2,   z: 0,    op: 0.05, color: 0x0a0a0a },
    { w: 2, h: 3,   x: 3,    y: 1,    z: -1.5, op: 0.04, color: 0x34d399 },
    { w: 6, h: 0.3, x: -2.5, y: 0.2,  z: -3,   op: 0.03, color: 0x0a0a0a },
  ]

  configs.forEach(cfg => {
    const geo = new THREE.PlaneGeometry(cfg.w, cfg.h)
    const mat = new THREE.MeshBasicMaterial({
      color: cfg.color,
      transparent: true,
      opacity: cfg.op,
      side: THREE.DoubleSide,
    })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(cfg.x, cfg.y, cfg.z)
    mesh.rotation.z = (Math.random() - 0.5) * 0.3
    scene.add(mesh)
    planes.push({
      mesh,
      vx: (Math.random() - 0.5) * 0.002,
      vy: (Math.random() - 0.5) * 0.001,
      rx: (Math.random() - 0.5) * 0.0003,
      ry: (Math.random() - 0.5) * 0.0002,
    })
  })

  // Thin horizontal lines (Swiss grid feel)
  const lineMat = new THREE.LineBasicMaterial({ color: 0x34d399, transparent: true, opacity: 0.08 })
  for (let i = -3; i <= 3; i++) {
    const geo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-8, i * 1.2, -2),
      new THREE.Vector3(8, i * 1.2, -2),
    ])
    scene.add(new THREE.Line(geo, lineMat))
  }

  const animate = () => {
    animId = requestAnimationFrame(animate)
    planes.forEach(p => {
      p.mesh.position.x += p.vx
      p.mesh.position.y += p.vy
      p.mesh.rotation.x += p.rx
      p.mesh.rotation.y += p.ry
      // Gentle bounds wrap
      if (Math.abs(p.mesh.position.x) > 6) p.vx *= -1
      if (Math.abs(p.mesh.position.y) > 4) p.vy *= -1
    })
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
