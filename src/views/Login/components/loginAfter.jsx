/**
 * 登录/注册引导组件
 */

import '../assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import TGShortcutMenu from '@/components/TGShortcutMenu'
import { Tag } from 'ant-design-vue'

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
      <BNContainer
        title="企业服务"
        width={390}
      >
        <div class="corporate-services">重庆誉存科技有限公司</div>
        <div>
          <Tag color="blue">已入驻</Tag>
          <Tag color="cyan">已签约</Tag>
          <Tag color="red">已欠费</Tag>
        </div>
        <TGShortcutMenu showLogout />
      </BNContainer>
    )
  }
}
