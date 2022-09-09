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
        {/*<Button*/}
        {/*  onClick={this.onEditClick}*/}
        {/*  icon="import"*/}
        {/*>*/}
        {/*  导入*/}
        {/*</Button>*/}
        <Button
          onClick={() => this.onExport('运营人员数据')}
          icon="export"
        >
          导出
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
