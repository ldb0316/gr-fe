import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter' // 패키지 설치 확인
import ThemeRegistry from '@/components/theme/ThemeRegistry'
import { Toaster } from 'react-hot-toast'
import AutoRouteProvider from '@/components/auth/AutoRouteProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>
        {/* MUI 스타일 캐시가 서버와 클라이언트에서 일치하도록 보장합니다 */}
        <AppRouterCacheProvider>
          <ThemeRegistry>
            <AutoRouteProvider>{children}</AutoRouteProvider>
          </ThemeRegistry>
        </AppRouterCacheProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  )
}
