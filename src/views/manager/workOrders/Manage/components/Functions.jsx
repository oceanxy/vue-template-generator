import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Space class="tg-function">
        <Button
          type={'primary'}
          onClick={() => this.onAddClick()}
          icon="plus"
        >
          新增
        </Button>
        <Button
          onClick={() => this.onExport('工单数据')}
          icon="export"
        >
          导出
        </Button>
        {/*<Button */}
        {/*  disabled={this.deleteButtonDisabled}*/}
        {/*  onClick={() => this.onDeleteClick()}*/}
        {/*  icon="delete"*/}
        {/*>*/}
        {/*  删除*/}
        {/*</Button>*/}
      </Space>
    )
  }
}