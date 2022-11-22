import { Button } from 'ant-design-vue'
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
        this.onExport('活动血压按学校统计', { gradeId: this.gradeId }, 'exportActivityBloodPressureByClass')
      } else if (this.hierarchy === 'grade') {
        this.onExport('活动血压按年级统计', { schoolId: this.schoolId }, 'exportActivityBloodPressureByGrade')
      } else {
        this.onExport('活动血压按班级统计', {}, 'exportActivityBloodPressureBySchool')
      }
    }
  },
  render() {
    return (
      <Button.Group class="tg-function">
        <Button
          onClick={this.onCustomExport}
          icon="export"
          disabled={this.exportButtonDisabled}
        >
          导出
        </Button>
      </Button.Group>
    )
  }
}
