import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  try {
    const hasRefreshToken =
      request.cookies.get('hasRefreshToken')?.value === 'true'
    const blackListWhenSignedIn = ['/user/signin', '/user/signup']

    if (hasRefreshToken && blackListWhenSignedIn.includes(pathname)) {
      return NextResponse.redirect(new URL('/main', request.url))
    }

    return NextResponse.next()
  } catch (error) {
    console.error('middleware error', error)
    if (pathname === '/error') return NextResponse.next() // 무한루프방지
    const errorUrl = new URL('/error', request.url)
    return NextResponse.rewrite(errorUrl) // 기존 URL 그대로 노출
  }
}
