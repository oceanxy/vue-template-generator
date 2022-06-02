/**
 * 需要账号密码的登录组件
 */

import './assets/styles/index.scss'
import { Button, Tabs } from 'ant-design-vue'
import ULLoginForm from '@/views/Login/components/TGLoginForm'
import ULLoginTabPane from '@/views/Login/components/TGLoginTabPane'
import BNContainer from '@/components/BNContainer'

export default {
  name: 'Login',
  props: {
    isShowSiteName: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    activeKey: 1
  }),
  methods: {
    handleTabClick(key) {
      this.activeKey = key
    },
    onLogonClick() {
      this.$router.push({ name: 'logon' })
    }
  },
  render() {
    return (
      <BNContainer
        width={600}
        class='login-box'
        contentClass='login-box-content'
        showTitleShape={false}
      >
        <div class="login-subtitle">Welcome Login!</div>
        <Tabs
          activeKey={this.activeKey}
          size="large"
          onTabClick={this.handleTabClick}
        >
          <ULLoginTabPane
            name="帐号密码登录"
            tabKey={1}
          >
            <ULLoginForm />
          </ULLoginTabPane>
          <ULLoginTabPane
            name="负责人手机号码登录"
            tabKey={2}
          >
            <ULLoginForm />
          </ULLoginTabPane>
        </Tabs>
        <div class="login-log-on">
          <Button
            type="link"
            onClick={this.onLogonClick}
          >
            企业还未入驻？点击立即申请
          </Button>
        </div>
      </BNContainer>
    )
  }
}
