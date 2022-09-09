import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import BNContainer from '@/components/BNContainer'
import Table from './components/Table'
import ModalForDetails from './components/ModalForDetails'
import ModalForInvoice from './components/ModalForInvoice'
import TGPagination from '@/components/TGPagination'
import TGContainer from '@/layouts/components/TGContainer'

export default {
  name: 'FinanceRecords',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainer modalTitle="缴费记录" contentClass="bn-records-container">
        <TGContainer>
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalForDetails modalTitle={'缴费明细'} />
            <ModalForInvoice modalTitle={'开具发票'} />
          </template>
        </TGContainer>
      </BNContainer>
    )
  }
}
