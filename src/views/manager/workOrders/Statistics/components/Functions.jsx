import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Space class="tg-function">
        <Button
          onClick={() => this.onExport('接单统计数据')}
          icon="export"
        >
          导出
        </Button>
      </Space>
    )
  }
}
