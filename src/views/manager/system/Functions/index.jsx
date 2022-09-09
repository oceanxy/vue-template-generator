import './assets/styles/index.scss'
import BNContainerWithSystemSider from '@/components/BNContainerWithSystemSider'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'SystemFunction',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainerWithSystemSider contentClass={'bnm-system-function-container'}>
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <ModalOfEdit slot={'modals'} modalTitle={'{action}菜单'} />
        </TGContainer>
      </BNContainerWithSystemSider>
    )
  }
}
