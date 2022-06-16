import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction],
  render() {
    return (
      <Space class="tg-function">
        <Button
          type="primary"
          // onClick={this.onAddClick}
          icon="plus"
        >
          导入
        </Button>
        <Button
          type="primary"
          // onClick={() => this._setVisibleOfModal({}, 'visibleOfQuestionnaireSwitch')}
          icon="plus"
        >
          导出
        </Button>
      </Space>
    )
  }
}
