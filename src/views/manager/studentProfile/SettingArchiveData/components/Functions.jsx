import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  render() {
    return (
      <Space class="tg-function">
        <Button
          icon="cloud-download"
          onClick={() => this._setVisibleOfModal({ type: 1 }, 'visibleOfReport')}
        >
          生成评价报告
        </Button>

        <Button
          icon="printer"
          onClick={() => this._setVisibleOfModal({ type: 2 }, 'visibleOfReport')}
        >
          生成打印报告
        </Button>
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
      </Space>
    )
  }
}
