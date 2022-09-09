import './assets/styles/index.scss'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfUrgingPayment from './components/ModalOfUrgingPayment'
import ModalOfBills from './components/ModalOfBills'
import ModalOfPaymentRecords from './components/ModalOfPaymentRecords'

export default {
  name: 'ValidContracts',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainerWithParkSider contentClass="bnm-valid-contracts-container">
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'企业缴费'} />
            <ModalOfUrgingPayment modalTitle={'企业催缴'} />
            <ModalOfBills modalTitle={'待缴账单'} />
            <ModalOfPaymentRecords modalTitle={'缴费记录'} />
          </template>
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
