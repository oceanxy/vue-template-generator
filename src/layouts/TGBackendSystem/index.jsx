import './assets/styles/index.scss'
import { Layout } from 'ant-design-vue'
import TGHeader from '@/layouts/components/TGHeader'
import TGMenu from '@/layouts/components/TGMenu'
import TGRouterView from '@/layouts/components/TGRouterView'
import TGBreadcrumb from '@/layouts/components/TGBreadcrumb'

export default {
  name: 'TGBackendSystemLayout',
  data: () => ({collapsed: false}),
  render() {
    return (
      <Layout id="tg-responsive-layout">
        <TGHeader layout="manager" />
        <Layout>
          <Layout.Sider
            theme={'light'}
            v-model={this.collapsed}
            trigger={''}
            class={`tg-sider${this.collapsed ? ' collapsed' : ''}`}
            collapsible
          >
            <TGMenu />
          </Layout.Sider>
          <Layout.Content class="tg-content">
            {this.$route.meta.hideBreadCrumb ? null : <TGBreadcrumb />}
            <TGRouterView />
          </Layout.Content>
        </Layout>
      </Layout>
    )
  }
}
