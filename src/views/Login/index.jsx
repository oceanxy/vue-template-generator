/**
 * 需要账号密码的登录组件
 */

import ULLoginForm from '@/views/Login/components/ULLoginForm'
import './assets/styles/index.scss'
import { Button, Tabs } from 'ant-design-vue'
import ULLoginTabPane from '@/views/Login/components/ULLoginTabPane'
import config from '@/config'

export default {
  name: 'Login',
  data: () => ({
    activeKey: 1
  }),
  methods: {
    handleTabClick(key) {
      this.activeKey = key
    }
  },
  render() {
    return (
      <div class="uni-log-login">
        <div class="login-center">
          <div class="login-logo">{config.systemName}竭诚为您服务</div>
          {/* 登录框 */}
          <div class="login-box">
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
              <Button type="link">企业还未入驻？点击立即申请</Button>
            </div>
          </div>
        </div>
        <div class='copyright'>©2022 巴南智慧园区版权所有 | ICP备案号：28391283921 | 技术支持：重庆誉存科技有限公司</div>
      </div>
    )
  }
}
