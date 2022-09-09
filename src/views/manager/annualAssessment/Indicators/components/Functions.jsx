import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import { mapGetters } from 'vuex'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Space class="tg-function">
        <Button
          type="primary"
          onClick={() => this.onAddClick()}
          icon="plus"
        >
          新增
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
