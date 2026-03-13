import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const { nextUrl, cookies, url } = request

  try {
    if (nextUrl.pathname === '/')
      // 기본경로로 들어오면 main으로 리다이렉트
      return NextResponse.redirect(new URL('/main', url))

    const hasRefreshToken = cookies.get('hasRefreshToken')?.value === 'true'
    const blackListWhenSignedIn = ['/user/signin', '/user/signup']

    if (hasRefreshToken && blackListWhenSignedIn.includes(nextUrl.pathname)) {
      return NextResponse.redirect(new URL('/main', url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('middleware error', error)
    if (nextUrl.pathname === '/error') return NextResponse.next() // 무한루프방지
    const errorUrl = new URL('/error', url)
    return NextResponse.rewrite(errorUrl) // 기존 URL 그대로 노출
  }
}
