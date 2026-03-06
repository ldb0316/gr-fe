import { useAuthStore } from '@/store/useAuthStore'
import { toast } from 'react-hot-toast'

export const customFetch = async (url: string, options: RequestInit = {}) => {
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })
    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      switch (data.status) {
        case 400:
          toast.error(data.message)
          break
        case 401:
          switch (data.statusDetail) {
            case '0_401':
              //trigger - login
              toast.error(data.message)
              useAuthStore.getState().setRouteSignupPage(true)
              break
            case '1_401':
              toast.error(data.message)
              break
            case '2_401':
              toast.error(data.message)
              break
            case '3_401':
              //TODO trigger - reissue
              break
            case '4_401':
              //trigger - login
              toast.error(data.message)
              useAuthStore.getState().setRouteSignupPage(true)
              break
          }
          break
        case 403:
          break
        case 404:
          break
        case 405:
          break
        case 409:
          break
        case 429:
          break
        case 500:
          break
      }
    } else {
      switch (data.status) {
        case 200:
          switch (data.statusDetail) {
            case '4_200':
              // TODO jwt 정보 세팅
              toast.success(data.message)
              break
            default:
              toast.success(data.message)
              break
          }
          break
        default:
          toast.success(data.message)
          break
      }
    }

    return data
  } catch (error) {
    if (error instanceof Error && error.message === 'Failed to fetch') {
      toast.error('네트워크 연결 상태를 확인해주세요.')
    }
    throw error
  }
}
