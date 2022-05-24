import { Layout } from 'ant-design-vue'
import TGHeader from '@/layouts/components/TGHeader'
import TGMenu from '@/layouts/components/TGMenu'
import TGRouterView from '@/layouts/components/TGRouterView'
import './assets/styles/index.scss'

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
        {/*<TGHeader collapsed={this.collapsed} />*/}
        <Layout.Content class="tg-content">
          <TGMenu class="tg-menu" />
          <TGRouterView />
          <TGMenu class="tg-sider" />
        </Layout.Content>
      </Layout>
    )
  }
}
