import { defineStore } from 'pinia'
// 替换假接口
import type { loginFormData, loginResponseData, userInfoReponseData } from '@/api/user/type'
import { reqLogin, reqUserInfo, reqLogout } from '@/api/user'

import type { UserState } from './types/type'
// 引入工具方法
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
//引入路由（常量路由）
import { constantRoute } from '@/router/routes'

let useUserStore = defineStore('User', {
  //存储数据的地方
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: ''
    }
  },

  actions: {
    // 用户登录的方法
    async userLogin(data: loginFormData) {
      console.log(data);


      let result: loginResponseData = await reqLogin(data);
      console.log(result);


      if (result.code == 200) {
        //真实接口切换
        this.token = (result.data.token as string);
        SET_TOKEN(result.data.token as string);

        return 'ok';

      } else {
        // console.log('debuuuug')
        return Promise.reject(new Error(result.message as string));
      }

    },
    // Get Info
    async userInfo() {

      let result: userInfoReponseData = await reqUserInfo();

      if (result.code == 200) {
        // 真实接口切换
        this.username = result.data.name;
        this.avatar = result.data.avatar;
        // this.username = result.data.checkUser.username;
        // this.avatar = result.data.checkUser.avatar;
        return 'ok';
      } else {
        return Promise.reject(new Error(result.message));
      }

    },
    // 退出登录
    async userLogout() {
      let result: any = await reqLogout();
      // console.log(result);
      if (result.code == 200) {
        // 目前没有mock接口：退出登录接口（通知服务器本地用户唯一标识失效）清空头像、token
        this.avatar = '';
        this.token = '';
        this.username = '';
        REMOVE_TOKEN();
        return 'ok';
      } else {
        return Promise.reject(new Error(result.message));
      }

    }
  },
  getters: {

  }

})

export default useUserStore;