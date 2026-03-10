import { create } from 'zustand'

interface Menu {
  menuTsid: string
  menuGroupCd: string
  menuPstnCd: string
  menuNm: string
  menuTypeCd: string
  menuAcsAuthrtCd: string
  upMenuTsid: string
  httpDmndMethNm: string
  urlAddr: string
  menuSeq: number
  menuExpln: string
  npagYn: string
  prvcInclYn: string
  sysMenuAuthrts: [
    {
      idMenuTsid: string
      idUserTypeCd: string
    },
  ]
  requiredAuthSet: string[]
}

interface MenuState {
  menus: Menu[]
  setMenus: (val: Menu[]) => void
  menuVersion: number
  setMenuVersion: (val: number) => void
}

export const useMenuStore = create<MenuState>((set) => ({
  menus: [],
  setMenus: (val) => set({ menus: val }),
  menuVersion: 0,
  setMenuVersion: (val) => set({ menuVersion: val }),
}))
