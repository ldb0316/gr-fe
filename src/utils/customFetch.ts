import { useAuthStore } from '@/store/useAuthStore'
import { responseAction } from './responseAction'

export const customFetch = async (url: string, options: RequestInit = {}) => {
  const accessToken = useAuthStore.getState().accessToken
  const response = await fetch(url, {
    ...options,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  })

  const data = await response.json().catch(() => ({}))

  const result = responseAction[data.status][data.statusDetail]({
    message: data.message,
    data: data,
    retry: () => customFetch(url, options),
  })
  if (result.throw) throw new Error(data.message) // 에러 발생 시 중단
  if (result.recursiveFunc) return await result.recursiveFunc()

  return data
}
