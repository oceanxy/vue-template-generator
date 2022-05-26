/**
 * 巴南项目登录模块布局文件
 */

import './assets/styles/index.scss'
import config from '@/config'
import TGRouterView from '@/layouts/components/TGRouterView'
import TGHeader from '@/layouts/components/TGHeader'
import { Layout } from 'ant-design-vue'

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
      <Layout id="tg-login-layout">
        <TGHeader showBreadcrumb={false} />
        <div class="login-center">
          <div class="login-site-name">
            {config.systemName}
          </div>
          <div class="login-site-name-en">
            {config.systemNameEn}
          </div>
          <TGRouterView />
        </div>
        <div class="copyright">©2022 巴南智慧园区版权所有 | ICP备案号：28391283921 | 技术支持：重庆誉存科技有限公司</div>
      </Layout>
    )
  }
}
