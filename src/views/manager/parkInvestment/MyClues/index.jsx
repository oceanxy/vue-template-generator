import './assets/styles/index.scss'
import Inquiry from './components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfDetails from './components/ModalOfDetails'
import ModalOfFollowUpClues from './components/ModalOfFollowUpClues'
import ModalOfEdit from '@/views/manager/parkInvestment/Clues/components/ModalOfEdit'

export default {
  name: 'MyClues',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-my-clues-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}线索'} />
          <ModalOfDetails modalTitle={'线索详情'} />
          <ModalOfFollowUpClues modalTitle={'线索跟进'} />
        </template>
      </TGContainer>
    )
  }
}
