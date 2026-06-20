declare module 'vanta/dist/vanta.halo.min' {
  import type * as THREE from 'three'
  interface VantaHaloOptions {
    el: HTMLElement
    THREE: typeof THREE
    [key: string]: unknown
  }
  function HALO(options: VantaHaloOptions): { destroy: () => void }
  export default HALO
}
