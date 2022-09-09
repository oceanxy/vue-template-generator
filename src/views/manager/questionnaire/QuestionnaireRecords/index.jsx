import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfResults from './components/ModalOfResults'

export default {
  name: 'QuestionnaireRecords',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-questionnaire-records-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfResults modalTitle={'调查记录'} />
        </template>
      </TGContainer>
    )
  }
}
