import './index.scss'
import Inquiry from './components/Inquiry'
import Functions from './components/Functions'
import Cards from './components/Cards'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfExpirationReminder from './components/ModalOfExpirationReminder'
import TGContainer from '@/layouts/components/TGContainer'
import ModalOfRenew from './components/ModalOfRenew'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import ModalOfTerminate from './components/ModalOfTerminate'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'

export default {
  name: 'Contracts',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <div class={'bnm-rescind-contract-container'}>
        <Cards />
        <BNContainerWithParkSider class={'park-container'}>
          <TGContainer>
            <Inquiry slot={'inquiry'} />
            <Functions slot={'functions'} />
            <Table slot={'table'} />
            <Pagination slot={'pagination'} />
            <template slot={'modals'}>
              <ModalOfExpirationReminder modalTitle={'到期提醒'} />
              <ModalOfRenew modalTitle={'续约'} />
              <ModalOfTerminate modalTitle={'解约'} />
            </template>
          </TGContainer>
        </BNContainerWithParkSider>
      </div>
    )
  }
}
