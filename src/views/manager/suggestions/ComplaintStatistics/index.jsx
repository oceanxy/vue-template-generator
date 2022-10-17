import './assets/styles/index.scss'
import { Button, Tabs } from 'ant-design-vue'
import dynamicState from '@/mixins/dynamicState'
import ByComplaintTime from './components/ByComplaintTime'
import ByComplaintStatus from './components/ByComplaintStatus'
import ByComplaintType from './components/ByComplaintType'
import ComplaintCompanyRanking from './components/ComplaintCompanyRanking'
import PersonnelAcceptanceRanking from './components/PersonnelAcceptanceRanking'

export default {
  name: 'ComplaintStatistics',
  mixins: [dynamicState()],
  methods: {
    async download() {
      await this.$store.dispatch('downExcel', {
        moduleName: this.moduleName,
        fileName: '投诉与处理排行榜'
      })
    }
  },
  render() {
    return (
      <div class={'bnm-complaint-statistics-container'}>
        <div class={'bnm-complaint-statistics-charts'}>
          <ByComplaintTime />
          <ByComplaintStatus />
          <ByComplaintType />
        </div>
        <Tabs
          class={'bnm-complaint-statistics-tables'}
          defaultActiveKey={1}
        >
          <Tabs.TabPane
            key={1}
            tab={'投诉企业排行'}
          >
            <ComplaintCompanyRanking />
          </Tabs.TabPane>
          <Tabs.TabPane
            key={2}
            tab={'人员受理排行'}
          >
            <PersonnelAcceptanceRanking />
          </Tabs.TabPane>
          <Button
            slot={'tabBarExtraContent'}
            icon={'export'}
            onClick={this.download}
          >
            导出明细
          </Button>
        </Tabs>
      </div>
    )
  }
}
