import { useAuthStore } from '@/store/useAuthStore'
import { customFetch } from './customFetch'
import { syncFrontMenus } from './syncMenu'

export const signOut = async () => {
  try {
    await customFetch('/api-be/user/signout', {
      method: 'POST',
    })
  } catch (error) {
    console.error('로그아웃에 실패했습니다.', error)
  } finally {
    useAuthStore.getState().setSignedOut()
    await syncFrontMenus({
      useCache: false,
    })
  }
}
