'use client'
import { useAuthStore } from '@/store/useAuthStore'
import { useMenuStore } from '@/store/useMenuStore'
import { customToast } from '@/utils/customToast'
import { CircularProgress } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'

const MenuGuard = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const { matchers } = useMenuStore((state) => state)
  const { isSignedIn } = useAuthStore((state) => state)
  const router = useRouter()

  const hasAccess = useMemo(() => {
    return matchers.some((match) => match(pathname))
  }, [matchers, pathname])

  // 로그아웃되면 matchers 가 변동됨 -> hasAccess 가 변동되고 false인지 검사됨 -> useEffect가 실행됨
  useEffect(() => {
    if (matchers.length > 0 && router) {
      if (!hasAccess) {
        // 로그인중이면 메인페이지
        // 비로그인이면 로그인페이지
        if (isSignedIn) {
          customToast.error('접근권한이 없습니다.', { id: 'not-authorized' })
          router.replace('/main')
        } else {
          customToast.warn('로그인이 필요한 서비스입니다.', {
            id: 'not-authorized',
          })
          router.replace(
            `/user/signin?redirect=${encodeURIComponent(pathname)}`,
          )
        }
      }
    }
  }, [matchers, isSignedIn, router, hasAccess, pathname])

  if (matchers.length === 0 || !hasAccess) {
    return (
      <>
        <CircularProgress />
        <div>메뉴 로딩중...</div>
      </>
    )
  }
  return <>{children}</>
}

export default MenuGuard
