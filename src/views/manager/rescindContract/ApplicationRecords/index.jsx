import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfDetails from './components/ModalOfDetails'

export default {
  name: 'ApplicationRecords',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-application-records-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <ModalOfDetails slot={'modals'} modalTitle={'解约申请详情'} />
      </TGContainer>
    )
  }
}
