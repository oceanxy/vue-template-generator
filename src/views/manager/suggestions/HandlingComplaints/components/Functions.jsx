import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Space class="tg-function">
        <Button
          disabled={this.buttonDisabled}
          onClick={() => this.onBulkOperations('visibleOfProcess')}
          icon="tool"
          type={'primary'}
        >
          处理
        </Button>
        <Button
          disabled={this.buttonDisabled}
          onClick={() => this.onBulkOperations('visibleOfAssign')}
          icon="solution"
        >
          转出
        </Button>
      </Space>
    )
  }
}
