//User Interface
import request from '@/utils/request'
import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from './type'
//Request Address
enum API {
  LOGIN_URL = '/user/login',
  USERINFO_URL = '/user/login/info',
  LOGOUT_URL = '/user/logout',
  // LOGIN_URL = '/admin/acl/index/login',
  // USERINFO_URL = '/admin/acl/index/info',
  // LOGOUT_URL = '/admin/acl/index/logout',
}

// Login Interface
export const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data)
// Get User Information
export const reqUserInfo = () =>
  request.get<any, userInfoReponseData>(API.USERINFO_URL)
// Logout
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)
