import TGHeader from '@/layouts/components/TGHeader'
import { Button, Layout } from 'ant-design-vue'

export default {
  name: 'NotFound',
  render() {
    return (
      <Layout class={'tg-not-found'}>
        <TGHeader layout="manager" page={'not-found'} />
        <Layout class={'tg-not-found-content'}>
          <div class={'hint'}>页面走丢了~</div>
          <Button type={'link'} onClick={() => this.$router.replace('/')}>返回首页</Button>
        </Layout>
      </Layout>
    )
  }
}
