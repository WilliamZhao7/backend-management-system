// 路由结构：
//     - Login
//     - Layout
//     
//     - User 
//     - Account
//       
//     - Order
//         - User Order
//         - Account Order
//         - Order Statistics
//     - Form
export const constantRoute = [
    {
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'login',
        meta: {
            title: 'Login',
            hidden: true,
            icon: ''
        },

    },

    {
        path: '/',
        component: () => import('@/layout/index.vue'),
        name: 'layout',
        meta: {
            title: '',
            hidden: false,
            icon: ''
        },
        redirect: '/home',
        children: [
            {
                path: '/home',
                component: () => import('@/views/home/index.vue'),
                name: 'home',
                meta: {
                    title: 'Home',
                    hidden: false,
                    icon: 'HomeFilled'
                }
            }
        ]

    },
    {
        path: '/user',
        component: () => import('@/layout/index.vue'),
        name: 'user',
        meta: {
            title: 'User',
            icon: 'User'
        },
        redirect: '/user/details',
        children: [
            {
                path: '/user/details',
                component: () => import('@/views/user/details/index.vue'),
                name: 'userDetails',
                meta: {
                    title: 'Details',
                    icon: 'Document'
                }
            }
        ]
    },
    {
        path: '/account',
        component: () => import('@/layout/index.vue'),
        name: '/account',
        meta: {
            title: 'Account',
            icon: 'PriceTag'
        },
        redirect: '/account/details',
        children: [
            {
                path: '/account/details',
                component: () => import('@/views/account/details/index.vue'),
                name: 'accountDetails',
                meta: {
                    title: 'Details',
                    icon: 'Document'
                }
            }
        ]
    }



]