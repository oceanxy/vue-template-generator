import { Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'
import { mapGetters } from 'vuex'

export default {
  mixins: [forFunction()],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    hierarchy() {
      return this.getState('hierarchy', this.moduleName)
    },
    gradeId() {
      return this.getState('currentGradeId', this.moduleName)
    },
    schoolId() {
      return this.getState('currentSchoolId', this.moduleName)
    }
  },
  methods: {
    onCustomExport() {
      if (this.hierarchy === 'class') {
        this.onExport('活动视力按学校统计', { gradeId: this.gradeId }, 'exportActivityVisionByClass')
      } else if (this.hierarchy === 'grade') {
        this.onExport('活动视力按年级统计', { schoolId: this.schoolId }, 'exportActivityVisionByGrade')
      } else {
        this.onExport('活动视力按班级统计', {}, 'exportActivityVisionBySchool')
      }
    }
  },
  render() {
    return (
      <Space class="tg-function">
        <Button
          onClick={this.onCustomExport}
          icon="export"
          disabled={this.exportButtonDisabled}
        >
          导出
        </Button>
      </Space>
    )
  }
}
