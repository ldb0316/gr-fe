import { create } from 'zustand'

interface RouteState {
  // 로그인 화면으로 route
  routeSigninPage: boolean
  setRouteSigninPage: (val: boolean) => void
  // 메인 화면으로 route
  routeMainPage: boolean
  setRouteMainPage: (val: boolean) => void
  // 비밀번호 변경 화면으로 route
  routeChangePasswordPage: boolean
  setRouteChangePasswordPage: (val: boolean) => void
  // 인증 재수행 화면으로 route
  routeReauthorizePage: boolean
  setRouteReauthorizePage: (val: boolean) => void
}

export const useRouteStore = create<RouteState>((set) => ({
  routeSigninPage: false,
  setRouteSigninPage: (val) => set({ routeSigninPage: val }),
  routeMainPage: false,
  setRouteMainPage: (val) => set({ routeMainPage: val }),
  routeChangePasswordPage: false,
  setRouteChangePasswordPage: (val) => set({ routeChangePasswordPage: val }),
  routeReauthorizePage: false,
  setRouteReauthorizePage: (val) => set({ routeReauthorizePage: val }),
}))
