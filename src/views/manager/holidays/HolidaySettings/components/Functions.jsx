import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Space class={'tg-function'}>
        <Button
          icon="plus"
          type={'primary'}
          onClick={() => this.onAddClick()}
        >
          新增
        </Button>
        <Button
          type="danger"
          icon="delete"
          disabled={this.deleteButtonDisabled}
          onClick={() => this.onDeleteClick()}
        >
          删除
        </Button>
        <Button
          icon="export"
          disabled={this.exportButtonDisabled}
          onClick={() => this.onExport()}
        >
          导出
        </Button>
      </Space>
    )
  }
}
