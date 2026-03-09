import { toast } from 'react-hot-toast'
import { responseAction } from './responseAction'

export const customFetch = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })
  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    const result = responseAction[data.status][data.statusDetail](data.message)
    if (result.throw) throw new Error(data.message) // 에러 발생 시 중단
    if (result.recursiveFunc) return result.recursiveFunc() // 재귀함수 필요 시 호출
  } else {
    const result = responseAction[data.status][data.statusDetail](data.message)
    if (result.throw) throw new Error(data.message) // 에러 발생 시 중단
  }

  return data
}
