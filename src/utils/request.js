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

    if (res?.status) {
      return Promise.resolve(res)
    }

    message.showMessage({
      message: res.message,
      type: 'error'
    })

    // 登录失效，需要重新登录
    if (+res.code === 30001) {
      let store

      if (process.env.VUE_APP_PROJECT === 'development-client') {
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
