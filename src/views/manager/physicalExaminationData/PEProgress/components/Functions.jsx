import '../assets/styles/index.scss'
import { Button, message, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import { mapGetters } from 'vuex'

export default {
  mixins: [forFunction()],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    search() {
      return this.getState('search', this.moduleName)
    },
    treeIdField() {
      return this.getState('treeIdField', this.moduleName)
    }
  },
  methods: {
    onExportBySchoolId() {
      if (!this.search[this.treeIdField] || this.search.orgType !== 5) {
        message.warn('请选择需要导出的学校！')
      } else {
        this.onExport('体检进度')
      }
    }
  },
  render() {
    return (
      <Space class="tg-function">
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
