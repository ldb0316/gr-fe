'use client'

import { useAuthStore } from '@/store/useAuthStore'
import { getCookie } from '@/utils/cookieUtils'
import { customFetch } from '@/utils/customFetch'
import { syncFrontMenus } from '@/utils/syncMenu'
import { CircularProgress } from '@mui/material'
import { useEffect, useState } from 'react'

const AuthInitializer = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true)
  const { setAccessToken } = useAuthStore((state) => state)

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)
      try {
        const hasRefreshToken = getCookie('hasRefreshToken') === 'true'

        if (hasRefreshToken) {
          await customFetch('/api-be/user/reissue', {
            method: 'POST',
          })
        }

        // 메뉴 정보 동기화
        await syncFrontMenus({
          useCache: true,
        })
      } catch {
        setAccessToken('')
      } finally {
        setLoading(false)
      }
    }

    initAuth()
  }, [setAccessToken])

  if (loading) return <CircularProgress />
  return <>{children}</>
}

export default AuthInitializer
