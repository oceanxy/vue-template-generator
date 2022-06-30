import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Functions from './components/Functions'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfResults from './components/ModalOfResults'

export default {
  name: 'QuestionnaireRecords',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-questionnaire-records-container">
        <Inquiry slot={'inquiry'} />
        <Functions slot={'functions'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfResults modalTitle={'调查记录'} />
        </template>
      </TGContainer>
    )
  }
}
