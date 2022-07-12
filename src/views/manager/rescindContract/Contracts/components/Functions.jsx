import '../index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  computed: {
    selectedRows() {
      return this.$store.state[this.moduleName].selectedRows
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button
          type="primary"
          // onClick={() => this.onAddClick()}
          icon="exception"
        >
          解约
        </Button>
        <Button
          type="primary"
          // onClick={() => this.onDeleteClick()}
          icon="bulb"
        >
          到期提醒
        </Button>
      </Space>
    )
  }
}
