import './assets/styles/index.scss'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfPaymentRecords from './components/ModalOfPaymentRecords'

export default {
  name: 'EarnestMoney',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainerWithParkSider contentClass="bnm-earnest-money-container">
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit candidateTitle={['收款', '退款']} />
            <ModalOfPaymentRecords modalTitle={'变动明细'} />
          </template>
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
