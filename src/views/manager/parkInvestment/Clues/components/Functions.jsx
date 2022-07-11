import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  computed: {
    selectedRowKeys() {
      return this.$store.state[this.moduleName].selectedRowKeys
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button
          type="primary"
          onClick={() => this.onAddClick()}
          icon="plus"
        >
          新增线索
        </Button>
        <Button
          onClick={() => this.onBulkOperations('visibleOfAssignLeads')}
          icon="unlock"
        >
          批量分配
        </Button>
        <Button
          onClick={() => this.onBulkOperations('visibleOfRecoverClues')}
          icon="lock"
        >
          批量收回
        </Button>
        <Button
          // onClick={() => this.onAddClick()}
          icon="export"
        >
          导出
        </Button>
        <Button
          // onClick={() => this.onAddClick()}
          icon="import"
        >
          导入
        </Button>
        <Button
          type="danger"
          onClick={() => this.onDeleteClick()}
          icon="delete"
          disabled={this.deleteButtonDisabled}
        >
          删除
        </Button>
      </Space>
    )
  }
}
