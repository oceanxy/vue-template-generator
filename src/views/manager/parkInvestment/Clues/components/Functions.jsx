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
          新增线索
        </Button>
        <Button
          onClick={() => this._setVisibleOfModal({}, 'visibleOfAssignLeads')}
          icon="plus"
        >
          批量分配
        </Button>
        <Button
          onClick={() => this._setVisibleOfModal({}, 'visibleOfRecoverClues')}
          icon="plus"
        >
          批量收回
        </Button>
        <Button
          onClick={() => this.onAddClick()}
          icon="plus"
        >
          导出
        </Button>
        <Button
          onClick={() => this.onAddClick()}
          icon="plus"
        >
          导入
        </Button>
        <Button
          onClick={() => this.onDeleteClick()}
          icon="plus"
        >
          删除
        </Button>
      </Space>
    )
  }
}
