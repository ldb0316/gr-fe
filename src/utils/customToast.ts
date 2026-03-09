import { toast } from 'react-hot-toast'
export const customToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  warn: (message: string) => toast(message, { icon: '⚠️' }),
  info: (message: string) => toast(message, { icon: 'ℹ️' }),
}
