import { create } from 'zustand'

interface AuthState {
  isSignedOut: boolean
  setSignedOut: (val: boolean) => void
  accessToken: string
  setAccessToken: (val: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isSignedOut: false,
  setSignedOut: (val) => set({ isSignedOut: val }),
  accessToken: '',
  setAccessToken: (val) => set({ accessToken: val }),
}))
