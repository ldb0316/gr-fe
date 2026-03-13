import { useRouteStore } from '@/store/useRouteStore'
import { customFetch } from './customFetch'
import { customToast } from './customToast'
import { useAuthStore } from '@/store/useAuthStore'
import { AuthResponse } from '@/global/types/AuthResponse'

interface ResponseAction {
  [key: number]: DetailAction
}

interface DetailActionParams {
  message?: string
  data?: unknown
  retry?: () => Promise<unknown>
}

interface DetailAction {
  [key: string]: (detailActionParams: DetailActionParams) => DetailActionResult
}

interface DetailActionResult {
  throw: boolean
  recursiveFunc?: () => Promise<unknown>
}

const HTTP_CODE_200: DetailAction = {
  '0_200': (params) => {
    if (params.message) customToast.success(params.message)
    return {
      throw: false,
    }
  },
  '1_200': (params) => {
    if (params.message) customToast.success(params.message)
    return {
      throw: false,
    }
  },
  '2_200': (params) => {
    if (params.message) customToast.success(params.message)
    return {
      throw: false,
    }
  },
  '3_200': (params) => {
    if (params.message) customToast.success(params.message)
    return {
      throw: false,
    }
  },
  '4_200': (params) => {
    // jwt 정보 세팅
    // first issued jwt (로그인)
    if (params.data) {
      const tokenData = params.data as AuthResponse
      useAuthStore.getState().setSignedIn(tokenData)
      if (params.message) customToast.success(params.message) // 로그인시에는 로그인 메시징 처리
    }

    return {
      throw: false,
    }
  },
  '5_200': (params) => {
    // reissued jwt
    if (params.data) {
      const tokenData = params.data as AuthResponse
      useAuthStore.getState().setSignedIn(tokenData)
      // 재발급시에는 메시징 처리 없이 조용히 진행한다.
    }
    return {
      throw: false,
    }
  },
  '6_200': (params) => {
    // 로그아웃
    if (params.message) customToast.success(params.message)
    return {
      throw: false,
    }
  },
}

const HTTP_CODE_400: DetailAction = {
  '0_400': (params) => {
    if (params.message) customToast.error(params.message)
    return {
      throw: true,
    }
  },
  '1_400': (params) => {
    if (params.message) customToast.error(params.message)
    return {
      throw: true,
    }
  },
  '2_400': (params) => {
    if (params.message) customToast.error(params.message)
    return {
      throw: true,
    }
  },
}
const HTTP_CODE_401: DetailAction = {
  '0_401': (params) => {
    //trigger - login
    if (params.message) customToast.warn(params.message)
    useRouteStore.getState().setRouteSigninPage(true)
    return {
      throw: true,
    }
  },
  '1_401': (params) => {
    if (params.message) customToast.error(params.message)
    return {
      throw: true,
    }
  },
  '2_401': (params) => {
    if (params.message) customToast.error(params.message)
    return {
      throw: true,
    }
  },
  '3_401': (params) => {
    // TODO 쿠키에서 hasRefreshToken 확인하고 있으면 재발급, 없으면 4_401로 이동
    return {
      throw: false,
      recursiveFunc: async () => {
        await customFetch('/api-be/user/reissue', {
          method: 'POST',
        })
        return await params.retry?.()
      },
    }
  },
  '4_401': (params) => {
    //trigger - login
    if (params.message) customToast.error(params.message)
    useRouteStore.getState().setRouteSigninPage(true)
    return {
      throw: true,
    }
  },
}
const HTTP_CODE_403: DetailAction = {
  '0_403': (params) => {
    if (params.message) customToast.error(params.message)
    return {
      throw: true,
    }
  },
  '1_403': (params) => {
    // trigger - main page
    if (params.message) customToast.error(params.message)
    useRouteStore.getState().setRouteMainPage(true)
    return {
      throw: true,
    }
  },
  '2_403': (params) => {
    if (params.message) customToast.warn(params.message)
    return {
      throw: true,
    }
  },
  '3_403': (params) => {
    if (params.message) customToast.warn(params.message)
    return {
      throw: true,
    }
  },
  '4_403': (params) => {
    // trigger - change password
    if (params.message) customToast.warn(params.message)
    useRouteStore.getState().setRouteChangePasswordPage(true)
    return {
      throw: true,
    }
  },
  '5_403': (params) => {
    if (params.message) customToast.warn(params.message)
    useRouteStore.getState().setRouteMainPage(true)
    return {
      throw: true,
    }
  },
  '6_403': (params) => {
    // trigger - 본인인증 다시 하고 계정 잠금 해제
    if (params.message) customToast.warn(params.message)
    useRouteStore.getState().setRouteReauthorizePage(true)
    return {
      throw: true,
    }
  },
}
const HTTP_CODE_404: DetailAction = {
  '0_404': (params) => {
    if (params.message) customToast.error(params.message)
    return {
      throw: true,
    }
  },
}
const HTTP_CODE_405: DetailAction = {
  '0_405': (params) => {
    if (params.message) customToast.error(params.message)
    return {
      throw: true,
    }
  },
}
const HTTP_CODE_409: DetailAction = {
  '0_409': (params) => {
    if (params.message) customToast.warn(params.message)
    return {
      throw: true,
    }
  },
  '1_409': (params) => {
    if (params.message) customToast.warn(params.message)
    return {
      throw: true,
    }
  },
  '2_409': (params) => {
    if (params.message) customToast.warn(params.message)
    return {
      throw: true,
    }
  },
}
const HTTP_CODE_429: DetailAction = {
  '0_429': (params) => {
    if (params.message) customToast.warn(params.message)
    return {
      throw: true,
    }
  },
}
const HTTP_CODE_500: DetailAction = {
  '0_500': (params) => {
    if (params.message) customToast.error(params.message)
    return {
      throw: true,
    }
  },
}

export const responseAction: ResponseAction = {
  200: HTTP_CODE_200,
  400: HTTP_CODE_400,
  401: HTTP_CODE_401,
  403: HTTP_CODE_403,
  404: HTTP_CODE_404,
  405: HTTP_CODE_405,
  409: HTTP_CODE_409,
  429: HTTP_CODE_429,
  500: HTTP_CODE_500,
}
