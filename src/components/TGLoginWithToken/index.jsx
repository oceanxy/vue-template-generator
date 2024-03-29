/**
 * 通过第三方token登录
 */

import { message } from 'ant-design-vue'
import { getCookie } from '@/utils/cookie'
import { getFirstLetterOfEachWordOfAppName } from '@/utils/utilityFunction'
import config from '@/config'

const appName = getFirstLetterOfEachWordOfAppName()

export default {
  name: 'TGLoginWithToken',
  async created() {
    const searchToken = new URL(window.location.href).searchParams.get(config.tokenConfig.fieldName)
    const localToken = localStorage.getItem(`${appName}-${config.tokenConfig.fieldName}`)

    const token = searchToken ||
      this.$route.query[config.tokenConfig.fieldName] ||
      getCookie(config.tokenConfig.fieldName) ||
      localToken

    // 如果 search 中存在 token，则删除之
    if (searchToken) {
      window.history.replaceState(null, null, window.location.pathname)
    }

    // 如果 hash 中存在 token，则删除之
    if (this.$route.query.token) {
      delete this.$route.query.token
    }

    if (token) {
      message.destroy()

      const response = await this.$store.dispatch('login/getUserInfo', { token })

      if (response.status) {
        await this.$store.dispatch('login/jump')
        this.$emit('errorStateChange', { status: false, error: null })
      } else {
        message.error(response.message || '获取用户信息失败', 0)

        await this.$store.dispatch('login/clear')
        this.$emit('errorStateChange', { status: true, error: new Error(response.message || '获取用户信息失败') })

        this.$nextTick(() => {
          this.jumpToThirdPartyLogin()
        })
      }
    } else {
      message.error('未检测到登录令牌或登录令牌已失效', 0)

      await this.$store.dispatch('login/clear')
      this.$emit('errorStateChange', { status: true, error: new Error('请检查登录令牌是否有效') })

      this.jumpToThirdPartyLogin()
    }
  },
  methods: {
    jumpToThirdPartyLogin() {
      if (process.env.VUE_APP_LOGIN_ADDRESS) {
        let url

        try {
          const URL = new window.URL(process.env.VUE_APP_LOGIN_ADDRESS)

          url = URL.href
        } catch (e) {
          url = window.location.origin + process.env.VUE_APP_LOGIN_ADDRESS
        } finally {
          window.location.href = url
        }
      }
    }
  },
  render() {
    return null
  }
}
