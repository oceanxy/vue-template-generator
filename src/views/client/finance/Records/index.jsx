import './assets/styles/index.scss'
import Table from '@/views/client/finance/Records/components/Table'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/client'
import BNContainer from '@/components/BNContainer'
import ModalForDetails from '@/views/client/finance/Records/components/ModalForDetails'
import ModalForInvoice from '@/views/client/finance/Records/components/ModalForInvoice'
import Pagination from './components/Pagination'
export default {
  name: 'FinanceRecords',
  mixins: [dynamicState(store, dynamicModules)],
  data: () => ({}),
  methods: {},
  render() {
    return (
      <BNContainer modalTitle="缴费记录" class="bn-records-container">
        <Table />
        <br />
        <Pagination></Pagination>
        <ModalForDetails modalTitle={'缴费明细'} />
        <ModalForInvoice modalTitle={'开具发票'} />
      </BNContainer>
    )
  }
}
