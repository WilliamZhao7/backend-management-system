//createUserList:次函数执行会返回一个数组,数组里面包含两个用户信息
export function createUserList() {
    return [
        {
            userId: 1,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'admin',
            name: 'admin@123.com',
            password: '111111',
            desc: '平台管理员',
            roles: ['平台管理员'],
            buttons: ['cuser.detail'],
            routes: ['home'],
            token: 'Admin Token',
        },
        {
            userId: 2,
            avatar:
                'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
            username: 'system',
            name: 'system@123.com',
            password: '111111',
            desc: '系统管理员',
            roles: ['系统管理员'],
            buttons: ['cuser.detail', 'cuser.user'],
            routes: ['home'],
            token: 'System Token',
        },
    ]
}
//对外暴露一个数组:数组里面包含两个接口
//登录假的接口
//获取用户信息的假的接口
export default [
    // 用户登录接口
    {
        url: '/api/user/login',//请求地址
        method: 'post',//请求方式
        response: ({ body }) => {
            //获取请求体携带过来的用户名与密码
            const { username, password } = body;
            //调用获取用户信息函数,用于判断是否有此用户
            const checkUser = createUserList().find(
                (item) => item.username === username && item.password === password,
            )
            //没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, message: '账号或者密码不正确', data: {}, ok: false }
            }
            //如果有返回成功信息
            return { code: 200, message: '登陆成功', data: { token: checkUser.token }, ok: true }
        },
    },
    // 获取用户信息
    {
        url: '/api/user/login/info',
        method: 'get',
        response: (request) => {
            //获取请求头携带token
            const token = request.headers.token;
            //查看用户信息是否包含有token用户
            const checkUser = createUserList().find((item) => item.token === token)
            //没有返回失败的信息
            if (!checkUser) {
                return { code: 201, message: { message: '获取用户信息失败' }, data: {}, ok: false }
            }
            //如果有返回成功信息
            return {
                code: 200,
                message: { message: '获取用户信息成功' },
                data: {
                    avatar: checkUser.avatar,
                    name: checkUser.name,
                    roles: checkUser.roles,
                    buttons: checkUser.buttons,
                    routes: checkUser.roles,

                },
                ok: true
            }
        },
    },

    //退出登录
    {
        url: '/api/user/logout',//请求地址
        method: 'post',//请求方式
        response: (request) => {


            //获取请求体携带过来的用户名与密码
            const token = request.headers.token;
            //调用获取用户信息函数,用于判断是否有此用户
            const checkUser = createUserList().find((item) => item.token === token)
            //没有用户返回失败信息
            if (!checkUser) {
                return { code: 201, message: '登出错误: 缺少Token', data: null, ok: false }
            }
            //如果有返回成功信息
            return { code: 200, message: '登出成功', data: null, ok: true }
        },
    },

]