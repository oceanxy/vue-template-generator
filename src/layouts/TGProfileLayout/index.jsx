import './assets/styles/index.scss'
import { Layout } from 'ant-design-vue'
import TGHeader from '@/layouts/components/TGHeader'
import TGMenu from '@/layouts/components/TGMenu'
import TGRouterView from '@/layouts/components/TGRouterView'
import TGShortcutMenu from '@/components/TGShortcutMenu'
import BNContainer from '@/components/BNContainer'
import TGList from '@/components/TGList'

export default {
  name: 'TGProfileLayout',
  data: () => ({
    collapsed: false
  }),
  methods: {},
  render() {
    return (
      <Layout id="tg-profile-layout">
        <TGHeader showBreadcrumb={false} />
        <Layout.Content class="tg-content">
          <TGMenu class="tg-menu" />
          <div class="tg-main">
            <TGRouterView />
          </div>
          <div class="tg-sider">
            <BNContainer
              width='100%'
              title='我的快捷菜单'
              showBoxShadow={false}
              class='shortcut-menu-container'
              titleClass='not-login-title'
              contentClass='shortcut-container'
            >
              <TGShortcutMenu column={3} />
            </BNContainer>
            <BNContainer
              class='my-news-container'
              width='100%'
              title='我的消息'
              showBoxShadow={false}
              showMore
              titleClass='not-login-title'
            >
              <TGList layout='dateBefore' />
            </BNContainer>
          </div>
        </Layout.Content>
      </Layout>
    )
  }
}
