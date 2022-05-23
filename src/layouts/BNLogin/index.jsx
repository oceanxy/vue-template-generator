/**
 * 巴南项目登录模块布局文件
 */

import './assets/styles/index.scss'
import config from '@/config'
import TGRouterView from '@/layouts/components/TGRouterView'

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
          <TGRouterView />
        </div>
        <div class="copyright">©2022 巴南智慧园区版权所有 | ICP备案号：28391283921 | 技术支持：重庆誉存科技有限公司</div>
      </div>
    )
  }
}
