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

  // const isFirstMounted = useRef(false)

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true)
      try {
        // 새로고침 시에도 동작을 보장하도록 하기 위해서 isSignedIn state가 아닌 쿠키를 활용한다.
        const hasRefreshToken = getCookie('hasRefreshToken') === 'true'

        if (hasRefreshToken) {
          await customFetch('/api-be/user/reissue', {
            method: 'POST',
          })
        }

        // 최초마운트 메뉴 정보 동기화
        await syncFrontMenus({
          useCache: true,
        })
      } catch {
        setAccessToken('')
      } finally {
        // isFirstMounted.current = true
        setLoading(false)
      }
    }

    initAuth()
  }, [setAccessToken])

  // useEffect(() => {
  //   if (!isFirstMounted.current) return
  //   // 로그인 상태가 변경되면 메뉴 정보 동기화
  //   syncFrontMenus({
  //     useCache: false,
  //   })
  // }, [isSignedIn])

  if (loading)
    return (
      <>
        <CircularProgress />
        <div>접근 권한 확인중...</div>
      </>
    )
  return <>{children}</>
}

export default AuthInitializer
