import '../assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from '../components/Functions'
import Inquiry from '../components/Inquiry'
import Tabs from '../components/Tabs'
import ModalOfSchools from '../components/ModalOfSchools'
import ModalOfStudents from '../components/ModalOfStudents'
import Table from './components/Table'

export default {
  name: 'NutritionalStatusStatistics',
  mixins: [dynamicState()],
  data: () => ({
    type: 1,
    exportParams: {}
  }),
  provide: { customApiNameForStudents: 'getStudentsOfNutritionalStatusStatistics' },
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
          fileName={'营养状况统计'}
          exportParams={this.exportParams}
        />
        <Inquiry
          slot={'inquiry'}
          type={this.type}
          statisticType={7}
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
