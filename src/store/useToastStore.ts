import { create } from 'zustand'

interface ToastState {
  singleOnlyToasted: boolean
  setSingleOnlyToasted: (val: boolean) => void
}

export const useToastStore = create<ToastState>((set) => ({
  singleOnlyToasted: false,
  setSingleOnlyToasted: (val) => set({ singleOnlyToasted: val }),
}))
