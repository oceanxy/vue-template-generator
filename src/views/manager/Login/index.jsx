/**
 * 需要账号密码的登录组件
 */

import './assets/styles/index.scss'
import ULLoginForm from '@/views/client/Login/components/TGLoginForm'
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
    }
  },
  render() {
    return (
      <div class="bnm-login">
        <div class='title'>巴南创新中心服务平台</div>
        <BNContainer
          width={400}
          class="bnm-login-box"
          contentClass="login-box-content"
          showTitleShape={false}
        >
          <div class="login-subtitle">Welcome Login!</div>
          <ULLoginForm />
        </BNContainer>
        <div class='corporate-services'>C2022科技局版权所有 | ICP备案号：xxxxxxxxxxxx | 技术支持：逾期付</div>
      </div>
    )
  }
}
