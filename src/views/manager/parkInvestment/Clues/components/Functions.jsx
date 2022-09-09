import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  computed: {
    selectedRows() {
      return this.$store.state[this.moduleName].selectedRows
    },
    assignButtonDisabled() {
      if (this.selectedRows.length) {
        return !this.selectedRows.filter(item => item.allotStatus !== 1).length <= 0
      } else {
        return true
      }
    },
    takeBackButtonDisabled() {
      if (this.selectedRows.length) {
        return !this.selectedRows.filter(item => item.allotStatus !== 2).length <= 0
      } else {
        return true
      }
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
          disabled={this.assignButtonDisabled}
        >
          批量分配
        </Button>
        <Button
          onClick={() => this.onBulkOperations('visibleOfRecoverClues')}
          icon="lock"
          disabled={this.takeBackButtonDisabled}
        >
          批量收回
        </Button>
        {/*<Button*/}
        {/*  // onClick={() => this.onAddClick()}*/}
        {/*  icon="export"*/}
        {/*>*/}
        {/*  导出*/}
        {/*</Button>*/}
        {/*<Button*/}
        {/*  // onClick={() => this.onAddClick()}*/}
        {/*  icon="import"*/}
        {/*>*/}
        {/*  导入*/}
        {/*</Button>*/}
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
