/**
 * 首屏
 */

import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import TGList from '@/components/TGList'

export default {
  name: 'Login',
  methods: {
    onLogin() {
      this.$router.push({ name: 'login' })
    },
    onLogon() {
      this.$router.push({ name: 'logon' })
    }
  },
  render() {
    return (
      <div class="bn-login-container">
        <BNContainer
          title="通知公告"
          width={390}
          showMore
          showTitleShape={false}
        >
          <TGList />
        </BNContainer>
        <BNContainer
          title="园区政策"
          width={390}
          showMore
          showTitleShape={false}
        >
          <TGList />
        </BNContainer>
        <RouterView />
      </div>
    )
  }
}
