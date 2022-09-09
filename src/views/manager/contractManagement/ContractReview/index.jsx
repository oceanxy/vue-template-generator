import './assets/styles/index.scss'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfContractReview from './components/ModalOfContractReview'

export default {
  name: 'ContractReview',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainerWithParkSider contentClass={'bnm-contract-review-container'}>
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <ModalOfContractReview slot={'modals'} modalTitle={'签约审核'} />
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
