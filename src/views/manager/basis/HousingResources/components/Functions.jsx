import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import tableButtons from '@/mixins/tableButtons'

export default {
  mixins: [tableButtons],
  render() {
    return (
      <Space class='tg-function'>
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
          导入
        </Button>
        <Button
          type="primary"
          onClick={this.onEditClick}
          icon="edit"
          disabled={this.editButtonDisabled}
        >
          导出
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
