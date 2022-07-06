/*
 * @Author: yangjialong 1476927892@qq.com
 * @Date: 2022-06-27 10:20:18
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-07-04 21:35:07
 * @FilePath: \vue-template-generator\src\utils\request.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import axios from 'axios'
import config from '@/config'
import message from '@/utils/message'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: config.timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    const token = sessionStorage.getItem('token')

    if (token) {
      config.headers.token = token
    }
    const companyId = sessionStorage.getItem('companyId')

    if (companyId) {
      config.headers.companyId = companyId
    }

    return config
  },
  error => {
    message.showMessage({
      message: error.message,
      type: 'error'
    })

    return Promise.resolve({
      code: 0,
      status: false
    })
  }
)

// response interceptor
service.interceptors.response.use(
  async response => {
    const res = response.data
    if (response.config.responseType === 'blob') {
      return Promise.resolve(res)
    } else if (res?.status) {
      return Promise.resolve(res)
    }
    message.showMessage({
      message: res.message,
      type: 'error'
    })

    // 登录失效，需要重新登录
    if (+res.code === 30001) {
      let store

      if (process.env.VUE_APP_PROJECT === 'development-client' || process.env.VUE_APP_PROJECT === 'production-client') {
        store = await import('../store/client')
      } else {
        store = await import('../store/manager')
      }

      store.default.dispatch('login/clear')
    }
    return Promise.resolve({
      code: 0,
      status: false
    })
  },
  error => {
    message.showMessage({
      message: error.message,
      type: 'error'
    })

    return Promise.resolve({
      code: 0,
      status: false
    })
  }
)

export default service
