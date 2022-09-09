import './assets/styles/index.scss'
import BNContainerWithSystemSider from '@/components/BNContainerWithSystemSider'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfMenu from './components/ModalOfMenu'

export default {
  name: 'SystemRole',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainerWithSystemSider contentClass={'bnm-system-role-container'}>
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}菜单'} />
            <ModalOfMenu modalTitle={'配置菜单'} />
          </template>
        </TGContainer>
      </BNContainerWithSystemSider>
    )
  }
}
