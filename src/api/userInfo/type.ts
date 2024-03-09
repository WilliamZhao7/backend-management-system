//账号信息的ts类型
export interface ResponseData {
    code: number
    message: string
    ok: boolean
}
//代表一个账号信息的ts类型
export interface UserInfo {
    userId: number,
    userName: string,
    nickName: string,
    password: string,
    email: string,
    address: string,
    areaCode: string,
    mobile: string,
    createTime: string,
    updateTime: string,
    status: number
}

export interface SearchResultData {
    userId: 0,
    userName: string,
    nickName: string,
    email: string,
    mobile: 0,
    address: string,
    createStartTime: 0,
    createEndTime: 0,
    updateStartTime: 0,
    updateEndTime: 0,
    status: string
}
//数组包含全部的用户信息
export type Records = UserInfo[]
//获取全部用户信息接口返回的数据ts类型
export interface UserInfoResponseData extends ResponseData {
    data: {
        records: Records
        total: number
        size: number
        current: number
        pages: number
    }
}