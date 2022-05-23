/**
 * 首屏
 */

import './assets/styles/index.scss'
import { Button } from 'ant-design-vue'
import BNContainerOfLogin from '@/views/Login/components/BNContainerOfLogin'

export default {
  name: 'Login',
  data: () => ({
    activeKey: 1
  }),
  methods: {
    handleTabClick(key) {
      this.activeKey = key
    },
    onLogin() {
      this.$router.push({ name: 'login' })
    },
    onLogon() {
      this.$router.push({ name: 'logon' })
    }
  },
  render() {
    return (
      <BNContainerOfLogin title="企业服务" contentClass='flex'>
        <Button
          class="button btn-login"
          onClick={this.onLogin}
        >
          签约企业登录
        </Button>
        <Button
          class="button btn-logon"
          onClick={this.onLogon}
        >
          企业申请入驻
        </Button>
      </BNContainerOfLogin>
    )
  }
}
