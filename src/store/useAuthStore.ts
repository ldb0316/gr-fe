import { AuthResponse } from '@/global/types/AuthResponse'
import { create } from 'zustand'

interface AuthState {
  setSignedOut: () => void
  accessToken: string
  setAccessToken: (val: string) => void
  sessionTimeoutDateTime: string
  sessionTimeoutMills: number
  sessionTimeoutMessage: string
  setSessionTimeoutMills: () => void
  isSignedIn: boolean
  setSignedIn: (val: AuthResponse) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  setSignedOut: () =>
    set({
      isSignedIn: false,
      accessToken: '',
      sessionTimeoutDateTime: '',
      sessionTimeoutMills: 0,
      sessionTimeoutMessage: '',
    }),
  accessToken: '',
  setAccessToken: (val) => set({ accessToken: val }),
  sessionTimeoutDateTime: '',
  sessionTimeoutMills: 0,
  sessionTimeoutMessage: '',
  setSessionTimeoutMills: () => {
    set((state) => {
      if (!state.sessionTimeoutDateTime) return {}

      const sessionTimeoutDateTime = new Date(state.sessionTimeoutDateTime)
      const now = new Date()
      const diffInMs = sessionTimeoutDateTime.getTime() - now.getTime()
      return {
        sessionTimeoutMills: diffInMs,
        sessionTimeoutMessage: `로그인 시간이 ${Math.floor(diffInMs / 1000)} 초 남았습니다.`,
      }
    })
  },

  isSignedIn: false,
  setSignedIn: (val: AuthResponse) => {
    const sessionTimeoutDateTime = new Date(val.data.sessionTimeoutDateTime)
    const now = new Date()
    const diffInMs = sessionTimeoutDateTime.getTime() - now.getTime()
    set({
      isSignedIn: true,
      accessToken: val.data.accessToken,
      sessionTimeoutDateTime: val.data.sessionTimeoutDateTime,
      sessionTimeoutMills: diffInMs,
      sessionTimeoutMessage: `로그인 시간이 ${Math.floor(diffInMs / 1000)} 초 남았습니다.`,
    })
  },
}))
