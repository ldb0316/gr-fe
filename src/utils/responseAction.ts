import { useRouteStore } from '@/store/useRouteStore'
import { customFetch } from './customFetch'
import { customToast } from './customToast'

interface ResponseAction {
  [key: number]: DetailAction
}

interface DetailAction {
  [key: string]: (message?: string) => DetailActionResult
}

interface DetailActionResult {
  throw: boolean
  recursiveFunc?: () => void
}

const HTTP_CODE_200: DetailAction = {
  '0_200': (message) => {
    if (message) customToast.success(message)
    return {
      throw: false,
    }
  },
  '1_200': (message) => {
    if (message) customToast.success(message)
    return {
      throw: false,
    }
  },
  '2_200': (message) => {
    if (message) customToast.success(message)
    return {
      throw: false,
    }
  },
  '3_200': (message) => {
    if (message) customToast.success(message)
    return {
      throw: false,
    }
  },
  '4_200': () => {
    // TODO jwt 정보 세팅
    return {
      throw: false,
    }
  },
}

const HTTP_CODE_400: DetailAction = {
  '0_400': (message) => {
    if (message) customToast.error(message)
    return {
      throw: true,
    }
  },
  '1_400': (message) => {
    if (message) customToast.error(message)
    return {
      throw: true,
    }
  },
  '2_400': (message) => {
    if (message) customToast.error(message)
    return {
      throw: true,
    }
  },
}
const HTTP_CODE_401: DetailAction = {
  '0_401': (message) => {
    //trigger - login
    if (message) customToast.warn(message)
    useRouteStore.getState().setRouteSignupPage(true)
    return {
      throw: true,
    }
  },
  '1_401': (message) => {
    if (message) customToast.error(message)
    return {
      throw: true,
    }
  },
  '2_401': (message) => {
    if (message) customToast.error(message)
    return {
      throw: true,
    }
  },
  '3_401': () => {
    //TODO trigger - reissue
    return {
      throw: false,
      recursiveFunc: () => {
        return customFetch('/api-be/user/reissue', {
          method: 'POST',
        })
      },
    }
  },
  '4_401': (message) => {
    //trigger - login
    if (message) customToast.error(message)
    useRouteStore.getState().setRouteSignupPage(true)
    return {
      throw: true,
    }
  },
}
const HTTP_CODE_403: DetailAction = {
  '0_403': (message) => {
    if (message) customToast.error(message)
    return {
      throw: true,
    }
  },
  '1_403': (message) => {
    // trigger - main page
    if (message) customToast.error(message)
    useRouteStore.getState().setRouteMainPage(true)
    return {
      throw: true,
    }
  },
  '2_403': (message) => {
    if (message) customToast.warn(message)
    return {
      throw: true,
    }
  },
  '3_403': (message) => {
    if (message) customToast.warn(message)
    return {
      throw: true,
    }
  },
  '4_403': (message) => {
    // trigger - change password
    if (message) customToast.warn(message)
    useRouteStore.getState().setRouteChangePasswordPage(true)
    return {
      throw: true,
    }
  },
  '5_403': (message) => {
    if (message) customToast.warn(message)
    useRouteStore.getState().setRouteMainPage(true)
    return {
      throw: true,
    }
  },
  '6_403': (message) => {
    // trigger - reauthorize
    if (message) customToast.warn(message)
    useRouteStore.getState().setRouteReauthorizePage(true)
    return {
      throw: true,
    }
  },
}
const HTTP_CODE_404: DetailAction = {
  '0_404': (message) => {
    if (message) customToast.error(message)
    return {
      throw: true,
    }
  },
}
const HTTP_CODE_405: DetailAction = {
  '0_405': (message) => {
    if (message) customToast.error(message)
    return {
      throw: true,
    }
  },
}
const HTTP_CODE_409: DetailAction = {
  '0_409': (message) => {
    if (message) customToast.warn(message)
    return {
      throw: true,
    }
  },
  '1_409': (message) => {
    if (message) customToast.warn(message)
    return {
      throw: true,
    }
  },
  '2_409': (message) => {
    if (message) customToast.warn(message)
    return {
      throw: true,
    }
  },
}
const HTTP_CODE_429: DetailAction = {
  '0_429': (message) => {
    if (message) customToast.warn(message)
    return {
      throw: true,
    }
  },
}
const HTTP_CODE_500: DetailAction = {
  '0_500': (message) => {
    if (message) customToast.error(message)
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
