import '../../statisticalAnalysis/assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from '../../statisticalAnalysis/components/Functions'
import Inquiry from '../../statisticalAnalysis/components/Inquiry'
import Tabs from '../../statisticalAnalysis/components/Tabs'
import ModalOfSchools from '../../statisticalAnalysis/components/ModalOfSchools'
import ModalOfStudents from '../../statisticalAnalysis/components/ModalOfStudents'
import Table from '../components/Table'

export default {
  name: 'HeightPercentile',
  mixins: [dynamicState()],
  data: () => ({
    type: 1,
    exportParams: {}
  }),
  provide: { customApiNameForStudents: 'getStudentsOfHeightStatistics' },
  methods: {
    onExportParamsChange(params) {
      this.exportParams = params
    }
  },
  render() {
    return (
      <TGContainer class={'fe-statistical-analysis-container'}>
        <Functions
          slot={'functions'}
          fileName={'身高数据百分位统计'}
          exportParams={this.exportParams}
        />
        <Inquiry
          slot={'inquiry'}
          type={this.type}
          statisticType={1}
          onExportParamsChange={this.onExportParamsChange}
        />
        <Tabs slot={'table'} vModel={this.type}>
          <Table type={1} slot={'ageTable'} />
          <Table type={2} slot={'gradeTable'} />
        </Tabs>
        <template slot={'modals'}>
          <ModalOfSchools modalTitle={'学校列表'} />
          <ModalOfStudents modalTitle={'学生列表'} />
        </template>
      </TGContainer>
    )
  }
}
