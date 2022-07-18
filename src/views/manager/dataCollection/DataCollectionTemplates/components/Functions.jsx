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
          onClick={() => this.onAddClick({ templateType: 1 })}
          icon="plus"
        >
          新增数据采集
        </Button>
        <Button
          type="primary"
          onClick={() => this.onAddClick({ templateType: 2 })}
          icon="plus"
        >
          新增问卷调查
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
