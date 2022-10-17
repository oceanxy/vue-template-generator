import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Space class="tg-function">
        <Button
          onClick={() => this.onExport('园区报表明细', { recordIds: this.selectedRowKeys.join() })}
          icon="export"
          disabled={!this.selectedRowKeys.length || this.exportButtonDisabled}
        >
          导出
        </Button>
      </Space>
    )
  }
}
