'use client'

import { useAuthStore } from '@/store/useAuthStore'
import { customFetch } from '@/utils/customFetch'
import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const authStore = useAuthStore((state) => state)
  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)
      try {
        await customFetch('/api-be/user/reissue', {
          method: 'POST',
        })
      } catch (error) {
        authStore.setAccessToken('')
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [])

  if (loading) return <CircularProgress />
  return <>{children}</>
}

export default AuthInitializer
