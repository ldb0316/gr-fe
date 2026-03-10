'use client'
import { useMenuStore } from '@/store/useMenuStore'
import { CircularProgress } from '@mui/material'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useMemo } from 'react'
import toast from 'react-hot-toast'

const MenuGuard = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const { menus, matchers } = useMenuStore((state) => state)
  const router = useRouter()

  const hasAccess = useMemo(() => {
    return matchers.some((match) => match(pathname))
  }, [matchers, pathname])

  useEffect(() => {
    if (menus.length > 0 && router) {
      if (!hasAccess) {
        toast.error('접근 불가능한 경로입니다.', { id: 'access-denied' })
        router.replace('/main')
      }
    }
  }, [menus, router, hasAccess])

  if (menus.length === 0 || !hasAccess) {
    return (
      <>
        <CircularProgress />
      </>
    )
  }

  return <>{children}</>
}

export default MenuGuard
