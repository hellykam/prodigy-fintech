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
  const W = el.clientWidth || window.innerWidth
  const H = el.clientHeight || 600

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100)
  camera.position.z = 6

  renderer = new THREE.WebGLRenderer({ canvas: el, alpha: true, antialias: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  // --- Nodes ---
  const COUNT = 80
  const pos = new Float32Array(COUNT * 3)
  const vel: { x: number; y: number; z: number }[] = []
  for (let i = 0; i < COUNT; i++) {
    pos[i * 3]     = (Math.random() - 0.5) * 10
    pos[i * 3 + 1] = (Math.random() - 0.5) * 8
    pos[i * 3 + 2] = (Math.random() - 0.5) * 4
    vel.push({ x: (Math.random() - 0.5) * 0.004, y: (Math.random() - 0.5) * 0.004, z: 0 })
  }

  const nodeGeo = new THREE.BufferGeometry()
  nodeGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3))
  const nodeMat = new THREE.PointsMaterial({ color: 0x00ffb2, size: 0.06, transparent: true, opacity: 0.9 })
  const points = new THREE.Points(nodeGeo, nodeMat)
  scene.add(points)

  // --- Lines (recomputed every 120 frames for performance) ---
  const lineMat = new THREE.LineBasicMaterial({ color: 0x00ffb2, transparent: true, opacity: 0.12 })
  let lineSegs: THREE.LineSegments | null = null
  const DIST_THRESH = 2.5

  function rebuildLines() {
    if (lineSegs) scene.remove(lineSegs)
    const verts: number[] = []
    for (let i = 0; i < COUNT; i++) {
      for (let j = i + 1; j < COUNT; j++) {
        const dx = pos[i * 3]!     - pos[j * 3]!
        const dy = pos[i * 3 + 1]! - pos[j * 3 + 1]!
        const dz = pos[i * 3 + 2]! - pos[j * 3 + 2]!
        if (dx * dx + dy * dy + dz * dz < DIST_THRESH * DIST_THRESH) {
          verts.push(pos[i * 3]!, pos[i * 3 + 1]!, pos[i * 3 + 2]!)
          verts.push(pos[j * 3]!, pos[j * 3 + 1]!, pos[j * 3 + 2]!)
        }
      }
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(verts), 3))
    lineSegs = new THREE.LineSegments(geo, lineMat)
    scene.add(lineSegs)
  }
  rebuildLines()

  // --- Mouse parallax ---
  let mouseX = 0
  let mouseY = 0
  const onMouse = (e: MouseEvent) => {
    mouseX = (e.clientX / window.innerWidth  - 0.5) * 0.5
    mouseY = (e.clientY / window.innerHeight - 0.5) * 0.5
  }
  window.addEventListener('mousemove', onMouse)

  let frame = 0
  const animate = () => {
    animId = requestAnimationFrame(animate)
    frame++

    // Move nodes
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3]!     += vel[i]!.x
      pos[i * 3 + 1]! += vel[i]!.y
      if (Math.abs(pos[i * 3]!)     > 5.2) vel[i]!.x *= -1
      if (Math.abs(pos[i * 3 + 1]!) > 4.2) vel[i]!.y *= -1
    }
    nodeGeo.attributes['position']!.needsUpdate = true

    if (frame % 120 === 0) rebuildLines()

    // Camera drift + mouse parallax
    scene.rotation.y += 0.0005
    camera.position.x += (mouseX - camera.position.x) * 0.03
    camera.position.y += (-mouseY - camera.position.y) * 0.03
    camera.lookAt(scene.position)

    renderer!.render(scene, camera)
  }
  animate()

  // Resize
  const onResize = () => {
    const w = el.parentElement?.clientWidth || window.innerWidth
    const h = el.parentElement?.clientHeight || 600
    camera.aspect = w / h
    camera.updateProjectionMatrix()
    renderer!.setSize(w, h)
  }
  window.addEventListener('resize', onResize)

  // Store cleanup refs on element
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
