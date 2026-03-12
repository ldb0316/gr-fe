import picomatch from 'picomatch'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

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
  menuVersion: number
  setMenus: (val: MenuResponse) => void
}

interface MenuResponse {
  menus: Menu[]
  version: number
}

export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      menus: [],
      matchers: [],
      menuVersion: 0,
      setMenus: (val: MenuResponse) => {
        const matchers = val.menus.map((menu) => picomatch(menu.urlAddr))
        set({
          menus: val.menus,
          matchers: matchers,
          menuVersion: val.version,
        })
      },
    }),
    {
      name: 'menu-storage',
      storage: createJSONStorage(() => sessionStorage),
      // 함수 타입인 matchers는 스토리지 저장에서 제외
      partialize: (state) => ({
        menus: state.menus,
        menuVersion: state.menuVersion,
      }),

      // 스토리지에서 데이터를 읽어온 후(새로고침 시) 함수를 다시 복구
      onRehydrateStorage: () => (state) => {
        if (state && state.menus.length > 0) {
          const matchers = state.menus.map((menu) => picomatch(menu.urlAddr))
          state.matchers = matchers
        }
      },
    },
  ),
)
