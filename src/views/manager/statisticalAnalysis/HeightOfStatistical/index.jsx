import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from './components/Functions'
import Tabs from './components/Tabs'
import Inquiry from '../components/Inquiry'
import ModalOfSchools from '@/views/manager/statisticalAnalysis/components/ModalOfSchools'
import ModalOfStudents from '@/views/manager/statisticalAnalysis/components/ModalOfStudents'

export default {
  name: 'HeightOfStatistical',
  mixins: [dynamicState()],
  data: () => ({
    type: 1,
    exportParams: {}
  }),
  methods: {
    onExportParamsChange(params) {
      this.exportParams = params
    }
  },
  render() {
    return (
      <TGContainer class={'fe-height-of-statistical-container'}>
        <Functions slot={'functions'} exportParams={this.exportParams} />
        <Inquiry
          slot={'inquiry'}
          type={this.type}
          statisticType={1}
          onExportParamsChange={this.onExportParamsChange}
        />
        <Tabs slot={'table'} vModel={this.type} />
        <template slot={'modals'}>
          <ModalOfSchools modalTitle={'学校列表'} />
          <ModalOfStudents modalTitle={'学生列表'} />
        </template>
      </TGContainer>
    )
  }
}
