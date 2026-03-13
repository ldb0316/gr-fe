'use client'
import { useMenuStore } from '@/store/useMenuStore'
import { customFetch } from '@/utils/customFetch'
import { Button } from '@mui/material'
import { useRouter } from 'next/navigation'

import { useState } from 'react'

const SamplePage = () => {
  const [apiData, setData] = useState('')
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
  const routeToMain = () => {
    router.push('/main')
  }

  const ldbArt = `
  _        ____    ____  
 | |      |  _ \\  | __ ) 
 | |      | | | | |  _ \\ 
 | |___   | |_| | | |_) |
 |_____|  |____/  |____/ 
`

  return (
    <>
      <h1>여기는 샘플페이지임..</h1>
      <Button onClick={requestApi}>api요청</Button>
      <Button onClick={routeToSignin}>로그인페이지</Button>
      <Button onClick={routeToMain}>메인페이지</Button>
      <hr />
      <div>{JSON.stringify(apiData)}</div>
      <hr />
      <pre>{ldbArt}</pre>
    </>
  )
}

export default SamplePage
