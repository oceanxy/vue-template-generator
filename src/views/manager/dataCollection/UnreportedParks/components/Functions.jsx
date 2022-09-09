import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import Message from '@/utils/message'

export default {
  mixins: [forFunction()],
  methods: {
    async reminderToFillIn() {
      await Message.verifySelected(this.selectedRowKeys, async () => {
        await this._setVisibleOfModal({ isBulkOperations: true }, 'visibleOfRemind')
      })
    }
  },
  render() {
    return (
      <Space class="tg-function">
        {/*<Button*/}
        {/*  // onClick={() => this.onAddClick({ templateType: 1 })}*/}
        {/*  icon="export"*/}
        {/*>*/}
        {/*  导出*/}
        {/*</Button>*/}
        <Button
          onClick={this.reminderToFillIn}
          disabled={this.deleteButtonDisabled}
          icon="bulb"
        >
          催报
        </Button>
      </Space>
    )
  }
}
