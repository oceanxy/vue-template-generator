import './assets/styles/index.scss'
import Inquiry from './components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfDetails from '@/views/manager/parkInvestment/Clues/components/ModalOfDetails'
import ModalOfFollowUpClues from '@/views/manager/parkInvestment/MyClues/components/ModalOfFollowUpClues'

export default {
  name: 'MyClues',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-my-clues-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfDetails title={'线索详情'} />
          <ModalOfFollowUpClues title={'线索跟进'} />
        </template>
      </TGContainer>
    )
  }
}
