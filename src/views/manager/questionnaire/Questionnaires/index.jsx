import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfQuestionnaireSwitch from './components/ModalOfQuestionnaireSwitch'

export default {
  name: 'Questionnaires',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-questionnaires-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}问卷'} />
          <ModalOfQuestionnaireSwitch modalTitle={'{action}问卷调查'} />
        </template>
      </TGContainer>
    )
  }
}
