'use client'
import { useAuthStore } from '@/store/useAuthStore'
import { customFetch } from '@/utils/customFetch'
import { customToast } from '@/utils/customToast'
import { useEffect } from 'react'

const SessionTimeout = ({ children }: { children: React.ReactNode }) => {
  const {
    isSignedIn,
    sessionTimeoutMills,
    setSessionTimeoutMills,
    setSignedOut,
  } = useAuthStore((state) => state)

  useEffect(() => {
    if (!isSignedIn) return
    if (sessionTimeoutMills <= 0) {
      customToast.info('장시간 미사용으로 자동 로그아웃 되었습니다.')
      // TODO 로그아웃 및 routing 처리
      customFetch('/api-be/user/signout', {
        method: 'POST',
      }).finally(() => {
        setSignedOut()
      })
      return
    }

    const timerId = setTimeout(() => {
      setSessionTimeoutMills() // session timeout mills update 수행
    }, 1000)

    return () => clearTimeout(timerId)
  }, [sessionTimeoutMills, setSessionTimeoutMills, setSignedOut, isSignedIn])

  return <>{children}</>
}

export default SessionTimeout
