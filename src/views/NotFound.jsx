import TGHeader from '@/layouts/components/TGHeader'
import { Layout } from 'ant-design-vue'

export default {
  name: 'NotFound',
  render() {
    return (
      <Layout class={'tg-not-found'}>
        <TGHeader layout="manager" />
        <Layout class={'tg-not-found-content'}>
          <div class={'hint'}>页面走丢了~</div>
        </Layout>
      </Layout>
    )
  }
}
