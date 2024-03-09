import { createUserList } from './user';
import type { UserInfo, Records, } from '../src/api/userInfo/type'
function createUserInfoList() {
    return [
        {
            userId: 1,
            userName: 'admin@123.com',
            nickName: 'admin',
            password: '111111',
            email: 'admin@gmail.com',
            address: 'aaa St',
            areaCode: '86',
            mobile: '13700889522',
            createTime: "2024-02-22 11:10:08",
            updateTime: "2024-02-22 11:10:08",
            status: 1
        },
        {
            userId: 2,
            userName: 'system@gmail.com',
            nickName: 'system',
            password: '111111',
            email: 'system@gmail.com',
            address: 'bbb St',
            areaCode: '86',
            mobile: '13789898982',
            "createTime": "2024-01-22 10:33:40",
            "updateTime": "2024-01-22 10:33:40",
            status: 0
        },
        {
            userId: 3,
            userName: 'tony@gmail.com',
            nickName: 'Your Hairstylist Tony',
            password: '111111',
            email: 'tony@gmail.com',
            address: 'ccc St',
            areaCode: '86',
            mobile: '1378989999082',
            createTime: "2024-01-01 10:33:40",
            updateTime: "2024-01-01 10:33:40",
            status: 1
        },
        {
            userId: 4,
            userName: 'ji@gmail.com',
            nickName: 'Your Hairstylist Ji',
            password: '111111',
            email: 'ji@gmail.com',
            address: 'ddd St',
            areaCode: '86',
            mobile: '999082',
            createTime: "2023-01-01 10:33:40",
            updateTime: "2023-01-01 10:33:40",
            status: 0
        },
        {
            userId: 5,
            userName: 'amash@gmail.com',
            nickName: 'Your Hairstylist Amash',
            password: '111111',
            email: 'amash@gmail.com',
            address: 'eee St',
            areaCode: '61',
            mobile: '688939575',
            createTime: "2022-01-01 10:33:40",
            updateTime: "2022-01-01 10:33:40",
            status: 1
        },
    ]
}
function pagination(page: number, limit: number): Object[] {

    let finish = page * limit - 1;
    let start = finish - limit + 1;
    let userInfoList = createUserInfoList();
    return userInfoList.slice(start, finish + 1);
}

export default [
    {
        url: '/api/user/info/',
        method: 'post',

        response: (request) => {
            //获取请求头携带token
            const token = request.headers.token;
            //查看用户信息是否包含有次token用户
            const checkUser = createUserList().find((item) => item.token === token);
            //没有返回失败的信息
            if (!checkUser) {
                return { code: 201, message: { message: 'Failed to fetch user information: Token doens not match' }, data: {}, ok: false }
            }
            console.log(request);

            const url = request.url;
            const pattern = /\?pageNum=(\d+)&pageSize=(\d+)/;
            const matches = url.match(pattern);
            var res: Object[];
            if (matches) {
                const page = parseInt(matches[1], 10);
                const limit = parseInt(matches[2], 10);
                const pages = Math.ceil(createUserInfoList().length / limit);
                res = pagination(page, limit);

                if (res.length > 0) {
                    return {
                        code: 200,
                        message: { message: '获取用户信息成功' },
                        data: {
                            records: res,
                            total: createUserInfoList().length,
                            size: limit,
                            current: page,
                            pages: pages
                        },
                        ok: true
                    }
                }
                return { code: 201, message: { message: 'Failed to fetch user information: URL does not match' }, data: {}, ok: false }
            }
        },
    }
]

