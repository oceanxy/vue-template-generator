import './assets/styles/index.scss'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'AccountOpening',
  mixins: [dynamicState()],
  render () {
    return (
      <BNContainerWithParkSider contentClass={'bnm-account-opening-container'}>
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <ModalOfEdit slot={'modals'} modalTitle={'账号开通审核'} />
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
