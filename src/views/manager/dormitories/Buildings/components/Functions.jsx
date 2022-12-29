import { Button, message, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import { mapGetters } from 'vuex'

export default {
  mixins: [forFunction()],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    schoolId() {
      return this.getState('search', this.moduleName)?.schoolId ?? null
    }
  },
  methods: {
    onExportBySchoolId() {
      if (!this.schoolId) {
        message.warn('请选择需要导出的学校！')
      } else {
        this.onExport('楼栋数据')
      }
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button
          onClick={this.onAddClick}
          icon="plus"
          type={'primary'}
        >
          新增
        </Button>
        <Button
          onClick={this.onDeleteClick}
          icon="delete"
          disabled={this.deleteButtonDisabled}
          type={'danger'}
        >
          删除
        </Button>
        <Button
          onClick={this.onExportBySchoolId}
          icon="export"
          disabled={this.exportButtonDisabled}
        >
          导出
        </Button>
      </Space>
    )
  }
}
