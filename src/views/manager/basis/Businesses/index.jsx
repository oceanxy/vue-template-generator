import './assets/styles/index.scss'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import Functions from '@/views/manager/basis/Businesses/components/Functions'
import Table from '@/views/manager/basis/Businesses/components/Table'
import Inquiry from '@/views/manager/basis/Businesses/components/Inquiry'
import Pagination from '@/views/manager/basis/Businesses/components/Pagination'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import TGContainer from '@/layouts/components/TGContainer'
import ModalOfShortMessage from './components/ModalOfShortMessage'
import ModalOfSuggestions from './components/ModalOfSuggestions'
import ModalOfPaymentRecords from './components/ModalOfPaymentRecords'
import ModalOfBills from './components/ModalOfBills'

export default {
  name: 'Businesses',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <BNContainerWithParkSider contentClass="bnm-businesses-container">
        <TGContainer>
          <Inquiry slot="inquiry" />
          <Functions slot="functions" />
          <Table slot="table" />
          <Pagination slot="pagination" />
          <template slot={'modals'}>
            <ModalOfShortMessage modalTitle={'发送短信'} />
            <ModalOfSuggestions modalTitle={'投诉建议'} />
            <ModalOfPaymentRecords modalTitle={'缴费记录'} />
            <ModalOfBills modalTitle={'账单查询'} />
          </template>
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
