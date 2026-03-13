import { useToastStore } from '@/store/useToastStore'
import { toast, ToastOptions } from 'react-hot-toast'
export const customToast = {
  success: (message: string, options?: ToastOptions) =>
    !useToastStore.getState().singleOnlyToasted
      ? toast.success(message, { ...options })
      : undefined,
  error: (message: string, options?: ToastOptions) =>
    !useToastStore.getState().singleOnlyToasted
      ? toast.error(message, { ...options })
      : undefined,
  warn: (message: string, options?: ToastOptions) =>
    !useToastStore.getState().singleOnlyToasted
      ? toast(message, { ...{ icon: '⚠️' }, ...options })
      : undefined,
  info: (message: string, options?: ToastOptions) =>
    !useToastStore.getState().singleOnlyToasted
      ? toast(message, { ...{ icon: 'ℹ️' }, ...options })
      : undefined,
}
