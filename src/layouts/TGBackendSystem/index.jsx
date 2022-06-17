import './assets/styles/index.scss'
import { Layout } from 'ant-design-vue'
import TGHeader from '@/layouts/components/TGHeader'
import TGMenu from '@/layouts/components/TGMenu'
import TGRouterView from '@/layouts/components/TGRouterView'
import TGBreadcrumb from '@/layouts/components/TGBreadcrumb'

export default {
  name: 'TGBackendSystemLayout',
  data: () => ({
    collapsed: false
  }),
  methods: {},
  render() {
    return (
      <Layout id="tg-responsive-layout">
        <TGHeader collapsed={this.collapsed} layout="manager" />
        <Layout>
          <Layout.Sider
            theme={'light'}
            width={230}
            v-model={this.collapsed}
            trigger={''}
            class="tg-sider"
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
