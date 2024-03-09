import request from '@/utils/request'
import type {
    UserInfoResponseData, SearchResultData
} from './type';

enum API {
    ALLUSER_URL = '/user/info',

    // LOGIN_URL = '/admin/acl/index/login',
    // USERINFO_URL = '/admin/acl/index/info',
    // LOGOUT_URL = '/admin/acl/index/logout',

}

export const reqUserInfo = (data: SearchResultData, pageNum: number, pageSize: number) =>
    request.post<any, UserInfoResponseData>(
        API.ALLUSER_URL + `/?pageNum=${pageNum}&pageSize=${pageSize}`, data
    )