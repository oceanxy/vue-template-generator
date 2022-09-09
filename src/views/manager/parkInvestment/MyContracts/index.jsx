import './assets/styles/index.scss'
import Inquiry from './components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfTerminate from './components/ModalOfTerminate'
import ModalOfRenew from './components/ModalOfRenew'

export default {
  name: 'MyContracts',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-my-contracts-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfTerminate modalTitle={'解约申请'} />
          <ModalOfRenew modalTitle={'解约申请'} />
        </template>
      </TGContainer>
    )
  }
}
