import './index.scss'
import Inquiry from './components/Inquiry'
import Cards from './components/Cards'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfExpirationReminder from './components/ModalOfExpirationReminder'
import TGContainer from '@/layouts/components/TGContainer'
import ModalOfRenew from './components/ModalOfRenew'
import dynamicState from '@/mixins/dynamicState'
import ModalOfTerminate from './components/ModalOfTerminate'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'

export default {
  name: 'Contracts',
  mixins: [dynamicState()],
  render() {
    return (
      <div class={'bnm-rescind-contract-container'}>
        <Cards class={'bnm-rescind-contract-card-container'} />
        <BNContainerWithParkSider class={'bnm-rescind-contract-content'}>
          <TGContainer>
            <Inquiry slot={'inquiry'} />
            <Table slot={'table'} />
            <TGPagination slot={'pagination'} />
            <template slot={'modals'}>
              <ModalOfExpirationReminder modalTitle={'到期提醒'} />
              <ModalOfRenew modalTitle={'续约申请'} />
              <ModalOfTerminate modalTitle={'解约申请'} />
            </template>
          </TGContainer>
        </BNContainerWithParkSider>
      </div>
    )
  }
}
