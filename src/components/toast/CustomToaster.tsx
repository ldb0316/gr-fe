'use client'
import { useToastStore } from '@/store/useToastStore'
import { useEffect, useMemo } from 'react'
import { Toaster, useToasterStore } from 'react-hot-toast'

const CustomToaster = () => {
  const { toasts } = useToasterStore()
  const { singleOnlyToasted, setSingleOnlyToasted } = useToastStore(
    (state) => state,
  )

  const singleOnlyToast: { [key: string]: boolean } = useMemo(() => {
    return {
      'session-timeout': true,
    }
  }, [])

  const isBlocking = toasts.some(
    (toast) => !!singleOnlyToast[toast.id] && toast.visible,
  )
  useEffect(() => {
    if (isBlocking !== singleOnlyToasted) setSingleOnlyToasted(isBlocking)
  }, [isBlocking, singleOnlyToasted, setSingleOnlyToasted])
  return <Toaster position="top-center" reverseOrder={false} />
}

export default CustomToaster
