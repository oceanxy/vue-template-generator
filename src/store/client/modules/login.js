import apis from '@/apis'
import router from '@/router/client'
import JSEncrypt from 'jsencrypt'
import config from '@/config'

let encryptor

if (!encryptor) {
  encryptor = new JSEncrypt()
  encryptor.setPublicKey(config.publicKeyClient)
}

export default {
  namespaced: true,
  state: {
    loading: false,
    userInfo: {
      fullName: '',
      id: ''
    }
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload
    },
    setUserInfo(state, payload) {
      state.userInfo = payload
    },
    setAuthentication(state, payload) {
      if (payload) {
        sessionStorage.setItem('token', payload)
      } else {
        sessionStorage.removeItem('token')
      }
    },
    setCompanyId(state, payload) {
      if (payload) {
        sessionStorage.setItem('companyId', payload)
      } else {
        sessionStorage.removeItem('companyId')
      }
    },
    setSiteCache(state, payload) {
      if (payload) {
        sessionStorage.setItem('defaultRoute', payload.defaultMenuUrl)
        sessionStorage.setItem('menu', JSON.stringify(payload.menuList))
      } else {
        sessionStorage.removeItem('defaultRoute')
        sessionStorage.removeItem('menu')
      }
    }
  },
  actions: {
    async login({ commit, state, dispatch }, payload) {
      commit('setLoading', true)

      const response = await apis.login({
        up: encryptor.encrypt(
          JSON.stringify({
            u: payload.username,
            p: payload.password
          })
        ),
        vc: payload.picCode
      })

      const { status } = response

      commit('setLoading', false)

      if (status) {
        const { userInfo, token, menuList, defaultMenuUrl } = response.data

        commit('setUserInfo', userInfo)
        commit('setAuthentication', token)
        // commit('setSiteCache', {
        //   menuList: menuList,
        //   defaultMenuUrl: defaultMenuUrl
        // })
        dispatch('getDetailInfo')

        await router.replace({ name: 'loginAfter' })
      }

      return Promise.resolve(response)
    },
    async bbsLogin({ commit, dispatch }, payload) {
      commit('setLoading', true)
      const response = await apis.bbsLogin({
        token: payload
      })
      commit('setLoading', false)
      if (response.status) {
        const { userInfo, token } = response.data
        commit('setUserInfo', userInfo)
        commit('setAuthentication', token)
        // commit('setSiteCache', {
        //   menuList: menuList,
        //   defaultMenuUrl: defaultMenuUrl
        // })
        dispatch('getDetailInfo')
      }
      return response
    },
    async getDetailInfo({ commit }) {
      const { status, data } = await apis.getDetailInfo()

      if (status) {
        commit('setUserInfo', data)
        commit('setCompanyId', data.companyId)
      }
    },
    async logout({ commit, dispatch }) {
      commit('setLoading', true)

      const response = await apis.logout()

      if (response.status) {
        await dispatch('clear')
      }

      commit('setLoading', false)

      return Promise.resolve(response)
    },
    async clear({ commit }) {
      commit('setUserInfo', {})
      commit('setAuthentication', null)
      commit('setSiteCache', null)

      await router.replace({ name: 'loginBefore' })

      return Promise.resolve()
    }
  }
}
