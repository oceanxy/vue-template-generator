import '../assets/styles/index.scss'
import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import { mapGetters } from 'vuex'

export default {
  mixins: [forFunction()],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    selectedRows() {
      return this.getState('selectedRows', this.moduleName)
    },
    currentItem() {
      return this.getState('currentItem', this.moduleName)
    },
    publishButtonDisabled() {
      return !this.selectedRows.length ||
        this.selectedRows.filter(item => item.reportStatus === 2).length !== this.selectedRows.length
    },
    endButtonDisabled() {
      return !this.selectedRows.length ||
        this.selectedRows.filter(item => item.reportStatus === 1).length !== this.selectedRows.length
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
          onClick={() => this.onBulkOperations(
            'visibleOfQuestionnaireSwitch',
            { reportStatus: 2 })
          }
          icon="container"
          disabled={this.publishButtonDisabled}
        >
          发布
        </Button>
        <Button
          onClick={() => this.onBulkOperations(
            'visibleOfQuestionnaireSwitch',
            { reportStatus: 1 })
          }
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
