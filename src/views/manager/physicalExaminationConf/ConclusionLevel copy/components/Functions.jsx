import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Space class="tg-function">
        <Button
          onClick={() => this.onAddClick()}
          icon="plus-square"
        >
          新增
        </Button>
        <Button
          onClick={() => this.onEditClick()}
          icon="edit"
        >
          修改
        </Button>
        <Button
          onClick={() => this.onDeleteClick()}
          icon="delete"
          disabled={this.deleteButtonDisabled}
        >
          删除
        </Button>
        <Button
          // onClick={() => this.onDeleteClick()}
          icon="reload"
          disabled={this.deleteButtonDisabled}
        >
          更新等级数据
        </Button>
      </Space>
    )
  }
}
