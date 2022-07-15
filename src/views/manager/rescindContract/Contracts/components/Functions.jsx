import '../index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  computed: {
    selectedRows() {
      return this.$store.state[this.moduleName].selectedRows
    },
    remindButtonDisabled() {
      if (this.selectedRows.length) {
        return !this.selectedRows.filter(item => item.signingStatus !== 3).length <= 0
      } else {
        return true
      }
    },
    terminateContractButtonDisabled() {
      if (this.selectedRows.length) {
        return !this.selectedRows.filter(item => item.signingStatus !== 3).length <= 0
      } else {
        return true
      }
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button
          type={'primary'}
          disabled={this.terminateContractButtonDisabled}
          // onClick={() => this.onAddClick()}
          icon={'exception'}
        >
          解约
        </Button>
        <Button
          type={'primary'}
          disabled={this.remindButtonDisabled}
          // onClick={() => this.onDeleteClick()}
          icon={'bulb'}
        >
          到期提醒
        </Button>
      </Space>
    )
  }
}
