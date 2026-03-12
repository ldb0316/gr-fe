'use client'
import { useAuthStore } from '@/store/useAuthStore'
import { useMenuStore } from '@/store/useMenuStore'
import { getCookie } from '@/utils/cookieUtils'
import { customFetch } from '@/utils/customFetch'
import { customToast } from '@/utils/customToast'
import { signOut } from '@/utils/signOut'
import { syncFrontMenus } from '@/utils/syncMenu'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

import { useState } from 'react'

const MainPage = () => {
  const [apiData, setData] = useState('')
  const { menus } = useMenuStore((state) => state)
  const router = useRouter()
  const requestApi = async () => {
    const data = await customFetch('/api-be/adm/menu', {
      method: 'GET',
    })
    setData(data)
  }
  const routeToSignin = () => {
    router.push('/user/signin')
  }

  const routeToSample = () => {
    router.push('/sample')
  }

  const {
    sessionTimeoutMills,
    sessionTimeoutDateTime,
    accessToken,
    sessionTimeoutMessage,
    isSignedIn,
    setSignedOut,
  } = useAuthStore((state) => state)

  const signTest = () => {
    const hasRefreshToken = getCookie('hasRefreshToken') === 'true'
    customToast.info(
      `hasRefreshToken: ${hasRefreshToken}\nsessionTimeoutDateTime: ${sessionTimeoutDateTime}\nsessionTimeoutMills: ${sessionTimeoutMills}\naccessToken: ${accessToken}`,
    )
  }

  return (
    <>
      <h1>여기 메인페이지임</h1>
      <h3>{sessionTimeoutMessage}</h3>
      <Button onClick={requestApi}>api요청</Button>
      {!isSignedIn && <Button onClick={routeToSignin}>로그인</Button>}
      {isSignedIn && <Button onClick={signOut}>로그아웃</Button>}
      <Button onClick={routeToSample}>샘플페이지</Button>
      <Button onClick={signTest}>로그인상태테스트</Button>
      <hr />
      <div>{JSON.stringify(apiData)}</div>
      <hr />
      <div>
        {menus.map((menu) => (
          <div key={menu.menuTsid}>
            {menu.menuNm + '(' + menu.menuAcsAuthrtCd + ')'}
          </div>
        ))}
      </div>
    </>
  )
}

export default MainPage
