//axios interceptors
import axios from 'axios'
import { ElMessage } from 'element-plus'
//import stores
import useUserStore from '@/store/modules/user'
//1. create axios object
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, //基础路径上会携带/api
  timeout: 5000, //超时的时间的设置
})
//2. Add request interceptors
request.interceptors.request.use((config) => {
  //Get token from userStore, and send our request with token every time

  const userStore = useUserStore()
  // if (userStore.token) {
  //   config.headers.token = userStore.token
  // }
  console.log(config.url);

  if (userStore.token) {
    config.headers.token = userStore.token;
  }
  console.log('结束拦截器');
  return config;
})

//3. Add response interceptors
request.interceptors.response.use(
  (response) => {
    //成功回调
    //简化数据


    return response.data
  },
  (error) => {
    //失败回调:处理http网络错误的
    //定义一个变量:存储网络错误信息
    let message = ''
    //http状态码
    const status = error.response.status
    switch (status) {
      case 401:
        message = 'TOKEN过期'
        break
      case 403:
        message = '无权访问'
        break
      case 404:
        message = '请求地址错误'
        break
      case 500:
        message = '服务器出现问题'
        break
      default:
        message = '网络出现问题'
        break
    }
    //提示错误信息
    ElMessage({
      type: 'error',
      message,
    })
    return Promise.reject(error)
  },
)
//对外暴露
export default request
