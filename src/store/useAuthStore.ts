import { create } from 'zustand'

interface AuthState {
  isSignedOut: boolean
  setSignedOut: (val: boolean) => void
}

export const useAuthStore = create<AuthState>((set) => ({
  isSignedOut: false,
  setSignedOut: (val) => set({ isSignedOut: val }),
}))
