import './assets/styles/index.scss'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'Utilities',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainerWithParkSider contentClass="bnm-utilities-container">
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <ModalOfEdit slot={'modals'} modalTitle={'{action}金额'} />
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
