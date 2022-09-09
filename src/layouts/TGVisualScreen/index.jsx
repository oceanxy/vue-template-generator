import './assets/styles/index.scss'
import { Layout } from 'ant-design-vue'
import TGRouterView from '@/layouts/components/TGRouterView'
import Header from '@/components/Header'
import Body from '@/components/Body'

export default {
  name: 'TGVisualScreenLayout',
  render() {
    return (
      <Layout id="tg-visual-screen-layout">
        <Header />
        <Body>
          <TGRouterView />
        </Body>
      </Layout>
    )
  }
}
