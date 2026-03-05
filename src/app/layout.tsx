import { AppRouterCacheProvider } from '@mui/material-nextjs/v16-appRouter' // 패키지 설치 확인
import ThemeRegistry from '@/components/ThemeRegistry'

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
          <ThemeRegistry>{children}</ThemeRegistry>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
