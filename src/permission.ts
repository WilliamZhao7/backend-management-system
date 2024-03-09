// 路由鉴权 - 项目当中路由能不能被访问的权限的设置 （某一个路由什么条件下可以访问，什么条件下不可以访问）
import router from '@/router'
// 引入进度条
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
import setting from './setting'

// 获取用户相关的小仓库内部token数据
import pinia from './store'
import useUserStore from './store/modules/user'
let userStore = useUserStore(pinia)

// 全局守卫：项目当中任意路由切换都会除法的钩子
// 全局前置守卫
router.beforeEach(async (to: any, from: any, next: any) => {
  document.title = `${setting.title} - ${to.meta.title}`

  // to: 你将要访问那个路由
  // from： 你从哪个路由而来
  // next： 路由的放行函数
  // 访问某一个路由之前的守卫
  nprogress.start()
  // 1. 获取token，判断用户登录还是未登录
  let token = userStore.token
  // 获取用户名
  let username = userStore.username
  if (token) {
    // 登陆成功
    if (to.path == '/login') {
      next({ path: '/' })
    } else {
      // 登陆成功访问其余路由
      // 有用户信息
      if (username) {
        // 放行
        next()
      } else {
        // 如果没有用户信息，在守卫这发请求获取到用户信息再放行
        try {
          // console.log('请求成功了吗')
          await userStore.userInfo()
          // console.log('请求成功');
        } catch (error) {
          // Token过期
          // 用户手动修改Token
          // 退出 - 登录
          await userStore.userLogout()
          next({ path: '/login', query: { redirect: to.path } })
        }
      }
    }
  } else {
    // 用户未登录
    if (to.path == '/login') {
      next()
    } else {
      next({ path: '/login', query: { redirect: to.path } })
    }
  }

  next()
})
// 全局后置守卫
router.afterEach((to: any, from: any) => {
  nprogress.done()
})

// 第一个问题： 任意路由的切换实现进度条业务 --nprogress 安装： pnpm i pnprogress
// 第二个问题：路由鉴权(路由组件访问权限设置)
// 全部路由组件： 登录 | 404 | 任意路由 | 首页 | 数据大屏 | 权限管理（三个子路由） | 商品管理（四个子路由）

// 用户未登录： 可以访问login，其余6个路由不能访问（指向login）
// 登录成功： 不可以访问login【指向首页】， 其余的路由可以访问
