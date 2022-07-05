import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  data() {
    return {
      publishButtonDisabled: true,
      endButtonDisabled: true
    }
  },
  methods: {},
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
          onClick={() => this._setVisibleOfModal({}, 'visibleOfQuestionnaireSwitch')}
          icon="container"
          disabled={this.publishButtonDisabled}
        >
          发布
        </Button>
        <Button
          onClick={() => this._setVisibleOfModal({}, 'visibleOfQuestionnaireSwitch')}
          icon="undo"
          disabled={this.endButtonDisabled}
        >
          结束
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
