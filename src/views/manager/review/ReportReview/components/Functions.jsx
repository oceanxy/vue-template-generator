import { Badge, Button, Space } from 'ant-design-vue'
import forFunction from '@/mixins/forFunction'

export default {
  mixins: [forFunction()],
  computed: {
    search() {
      return this.$store.state[this.moduleName].search
    },
    studentsNeedToQuickReview() {
      return this.$store.state[this.moduleName].studentsNeedToQuickReview
    }
  },
  watch: {
    async 'search.orgId'(value) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'studentsNeedToQuickReview',
        customApiName: 'getStudentsNeedToQuickReview',
        payload: {
          orgId: value,
          orgType: this.search.orgType
        }
      })
    }
  },
  render() {
    return (
      <Space class={'tg-function'}>
        <Badge dot={!!this.studentsNeedToQuickReview.pendingGradeList.length}>
          <Button
            icon="audit"
            type={'primary'}
            disabled={!this.studentsNeedToQuickReview.pendingGradeList.length}
            onClick={() => this.onAuditClick('visibilityOfQuickReview')}
          >
            一键审核
          </Button>
        </Badge>
        <Button
          icon="export"
          disabled={this.exportButtonDisabled}
          onClick={() => this.onExport()}
        >
          导出
        </Button>
      </Space>
    )
  }
}
