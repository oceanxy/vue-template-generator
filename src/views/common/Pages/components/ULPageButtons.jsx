import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import '../assets/styles/index.scss'

export default {
  mixins: [forFunction],
  render() {
    return (
      <Space>
        <Button
          type="primary"
          onClick={this.onAddClick}
          icon="plus"
        >
          新增
        </Button>
        <Button
          type="primary"
          onClick={this.onEditClick}
          icon="edit"
          disabled={this.editButtonDisabled}
        >
          修改
        </Button>
        <Button
          type="danger"
          onClick={this.onDeleteClick}
          icon="delete"
          disabled={this.deleteButtonDisabled}
        >
          删除
        </Button>
      </Space>
    )
  }
}
