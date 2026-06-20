import { ref } from 'vue'

export interface Toast {
  id: string
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}

const toasts = ref<Toast[]>([])

let idCounter = 0

export function useToast() {
  function show(message: string, type: Toast['type'] = 'success', duration = 4000) {
    const id = `toast_${++idCounter}`
    toasts.value.push({ id, message, type, duration })
    setTimeout(() => {
      dismiss(id)
    }, duration)
  }

  function dismiss(id: string) {
    const idx = toasts.value.findIndex((t) => t.id === id)
    if (idx !== -1) toasts.value.splice(idx, 1)
  }

  return { toasts, show, dismiss }
}
