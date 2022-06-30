import './assets/styles/index.scss'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import Inquiry from './components/Inquiry'
import Functions from './components/Functions'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'AccountOpening',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <BNContainerWithParkSider contentClass={'bnm-account-opening-container'}>
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Functions slot={'functions'} />
          <Table slot={'table'} />
          <Pagination slot={'pagination'} />
          <ModalOfEdit slot={'modals'} modalTitle={'账号开通审核'} />
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
