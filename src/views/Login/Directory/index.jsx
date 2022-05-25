/**
 * 登录后的目录页
 */

import './index.scss'
import { Tag } from 'ant-design-vue'
import BNContainer from '@/components/BNContainer'
import TGList from '@/components/TGList'
import TGShortcutMenu from '@/components/TGShortcutMenu'

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
      <div class="directory-container">
        <BNContainer
          title="通知公告"
          width={390}
          showMore
        >
          <TGList themeColor="#52c41a" />
        </BNContainer>
        <BNContainer
          title="园区政策"
          width={390}
          showMore
        >
          <TGList themeColor="#1890FF" />
        </BNContainer>
        <BNContainer
          title="企业服务"
          width={390}
        >
          <div class='corporate-services'>重庆誉存科技有限公司</div>
          <div>
            <Tag color='blue'>已入驻</Tag>
            <Tag color='cyan'>已签约</Tag>
            <Tag color='red'>已欠费</Tag>
          </div>
          <TGShortcutMenu showLogout />
        </BNContainer>
      </div>
    )
  }
}
