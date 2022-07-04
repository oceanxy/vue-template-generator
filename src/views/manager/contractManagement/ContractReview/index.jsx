import './assets/styles/index.scss'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfContractReview from './components/ModalOfContractReview'

export default {
  name: 'ContractReview',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <BNContainerWithParkSider contentClass={'bnm-contract-review-container'}>
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <Pagination slot={'pagination'} />
          <ModalOfContractReview slot={'modals'} modalTitle={'签约审核'} />
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
