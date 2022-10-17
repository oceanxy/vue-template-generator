import '../assets/styles/index.scss'
import { Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Space class="tg-function">
        {/*<Button type="primary" icon="cloud-download">*/}
        {/*  导出*/}
        {/*</Button>*/}
      </Space>
    )
  }
}
