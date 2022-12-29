import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Space class="tg-function">
        <Button
          onClick={() => this.onExport('按年级纬度统计活动血压数据')}
          icon="export"
          disabled={this.exportButtonDisabled}
        >
          导出
        </Button>
      </Space>
    )
  }
}
