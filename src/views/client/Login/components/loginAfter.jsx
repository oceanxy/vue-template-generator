/**
 * 登录/注册引导组件
 */

import '../assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import TGShortcutMenu from '@/components/TGShortcutMenu'
import { Button, Tag } from 'ant-design-vue'

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
    },
    toEnterpriseCenter() {
      this.$router.push({ name: 'home' })
    }
  },
  render() {
    return (
      <BNContainer
        moduleTitle={
          <div class='corporate-services-title'>
            企业服务
            <Button
              type='primary'
              class='custom-button'
              onClick={this.toEnterpriseCenter}
            >
              进入企业中心
            </Button>
          </div>
        }
        width={390}
        showTitleShape={false}
      >
        <div class="corporate-services">重庆誉存科技有限公司</div>
        <div class="corporate-services-tags">
          <Tag color="blue">已入驻</Tag>
          <Tag color="cyan">已签约</Tag>
          <Tag color="red">已欠费</Tag>
        </div>
        <TGShortcutMenu showLogout />
      </BNContainer>
    )
  }
}
