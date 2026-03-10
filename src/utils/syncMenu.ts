import { useAuthStore } from '@/store/useAuthStore'
import { useMenuStore } from '@/store/useMenuStore'

export const syncFrontMenus = async ({ useCache }: { useCache?: boolean }) => {
  const accessToken = useAuthStore.getState().accessToken
  const { menuVersion, setMenuVersion, setMenus } = useMenuStore.getState()
  try {
    const response = await fetch('/api-be/common/menu/fe', {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(useCache && { 'X-Menu-Version': menuVersion.toString() }),
        ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
      },
    })

    if (response.status === 304) return
    if (response.ok) {
      const result = await response.json().catch(() => ({}))
      setMenuVersion(result.data.version)
      setMenus(result.data.menus)
      console.log(result)
    }
  } catch (error) {
    console.error('메뉴 동기화 실패', error)
  }
}
