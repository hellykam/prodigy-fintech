import { ref, readonly } from 'vue'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  type: ToastType
  message: string
  duration: number
}

const toasts = ref<Toast[]>([])

function show(message: string, type: ToastType = 'info', duration = 3000) {
  const id = Math.random().toString(36).slice(2)
  toasts.value.push({ id, type, message, duration })
  setTimeout(() => dismiss(id), duration)
}

function dismiss(id: string) {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

export function useToast() {
  return {
    toasts: readonly(toasts),
    show,
    dismiss,
    success: (msg: string, duration?: number) => show(msg, 'success', duration),
    error: (msg: string, duration?: number) => show(msg, 'error', duration),
    warning: (msg: string, duration?: number) => show(msg, 'warning', duration),
    info: (msg: string, duration?: number) => show(msg, 'info', duration),
  }
}
