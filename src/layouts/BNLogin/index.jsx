/**
 * 巴南项目登录模块布局文件
 */

import './assets/styles/index.scss'
import TGRouterView from '@/layouts/components/TGRouterView'
import TGHeader from '@/layouts/components/TGHeader'
import { Layout } from 'ant-design-vue'
import config from '@/config'

export default {
  name: 'Login',
  data: () => ({activeKey: 1}),
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
          <div class="login-site-name">{config.systemName}</div>
          <div class="login-site-name-en">{config.systemNameEn}</div>
          <TGRouterView />
        </div>
        <div class="copyright">
          ©2022 重庆市巴南区科学技术局版权所有 | ICP备案号：渝ICP备17009455号-5 | 技术服务单位：重庆誉企服科技有限公司
        </div>
      </Layout>
    )
  }
}
