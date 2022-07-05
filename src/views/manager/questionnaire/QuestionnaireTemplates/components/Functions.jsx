import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

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
          onClick={() => this.onDeleteClick()}
          disabled={this.editButtonDisabled}
          icon="delete"
        >
          删除
        </Button>
      </Space>
    )
  }
}
