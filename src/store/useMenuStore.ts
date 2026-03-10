import picomatch from 'picomatch'
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
  matchers: picomatch.Matcher[]
  setMenus: (val: Menu[]) => void
  menuVersion: number
  setMenuVersion: (val: number) => void
}

export const useMenuStore = create<MenuState>((set) => ({
  menus: [],
  matchers: [],
  setMenus: (val) => {
    const matchers = val.map((menu) => picomatch(menu.urlAddr))
    set({ menus: val, matchers: matchers })
  },
  menuVersion: 0,
  setMenuVersion: (val) => set({ menuVersion: val }),
}))
