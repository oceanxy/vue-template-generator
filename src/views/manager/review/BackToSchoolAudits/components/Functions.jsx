import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Space class={'tg-function'}>
        <Button
          icon="export"
          type={'primary'}
          disabled={this.exportButtonDisabled}
          onClick={() => this.onExport()}
        >
          导出
        </Button>
      </Space>
    )
  }
}
