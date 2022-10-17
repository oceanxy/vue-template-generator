import './assets/styles/index.scss'
import BNContainerWithSider from '@/components/BNContainerWithSider'
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
      <BNContainerWithSider
        contentClass={'bnm-system-role-container'}
        apiOptions={{
          apiName: 'getRoleTree',
          stateName: 'roleTree',
          moduleName: 'common'
        }}
        treeIdField={'parentId'}
        notNoneMode={true}
      >
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}角色'} />
            <ModalOfMenu modalTitle={'配置菜单'} />
          </template>
        </TGContainer>
      </BNContainerWithSider>
    )
  }
}
