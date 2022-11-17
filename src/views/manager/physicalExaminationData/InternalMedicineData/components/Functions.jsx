import '../assets/styles/index.scss'
import { Button, message } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import { mapGetters } from 'vuex'

export default {
  mixins: [forFunction()],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    peObjOrgId() {
      return this.getState('search', this.moduleName)?.peObjOrgId ?? null
    }
  },
  methods: {
    onExportBySchoolId() {
      if (!this.peObjOrgId) {
        message.warn('请选择需要导出的学校！')
      } else {
        this.onExport('体检基础数据')
      }
    }
  },
  render() {
    return (
      <Button.Group class="tg-function">
        <Button
          onClick={this.onExportBySchoolId}
          icon="export"
          disabled={this.exportButtonDisabled}
        >
          导出
        </Button>
      </Button.Group>
    )
  }
}