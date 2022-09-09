import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  computed: {
    buttonDisabled() {
      return !this.selectedRows.length || !!this.selectedRows.filter(item => item.acceptStatus !== 2).length
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button
          type="primary"
          onClick={() => this.$router.push({ name: 'complaintRegistration' })}
          icon="plus"
        >
          投诉登记
        </Button>
        <Button
          disabled={this.buttonDisabled}
          onClick={() => this.onBulkOperations('visibleOfProcess')}
          icon="tool"
        >
          处理
        </Button>
        <Button
          disabled={this.buttonDisabled}
          onClick={() => this.onBulkOperations('visibleOfAssign')}
          icon="solution"
        >
          分配/转移
        </Button>
      </Space>
    )
  }
}
