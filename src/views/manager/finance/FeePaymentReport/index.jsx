import './assets/styles/index.scss'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfPaymentRecords from './components/ModalOfPaymentRecords'
import ModalOfBilling from './components/ModalOfBilling'

export default {
  name: 'FeePaymentReport',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainerWithParkSider contentClass="bnm-fee-payment-report-container">
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfPaymentRecords modalTitle={'查看明细'} />
            <ModalOfBilling modalTitle={'开具发票'} />
          </template>
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
