'use client'
import { useRouteStore } from '@/store/useRouteStore'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * response code 에 따른 자동 라우팅을 위한 provider 구현.
 * responseActions.ts에서 트리거되며,
 * useRouteStore.ts 에서 상태값 관리를 담당한다.
 * @author Lee da bin
 *
 */
const AutoRouteProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter()
  const { routeSigninPage, setRouteSigninPage } = useRouteStore(
    (state) => state,
  )
  useEffect(() => {
    if (routeSigninPage) {
      router.replace('/user/signin')
      setRouteSigninPage(false)
    }
  }, [routeSigninPage, router, setRouteSigninPage])

  const { routeMainPage, setRouteMainPage } = useRouteStore((state) => state)
  useEffect(() => {
    if (routeMainPage) {
      router.replace('/main')
      setRouteMainPage(false)
    }
  }, [routeMainPage, router, setRouteMainPage])

  return <>{children}</>
}
export default AutoRouteProvider
