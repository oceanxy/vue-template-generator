import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfMenu from './components/ModalOfMenu'
import Functions from './components/Functions'

export default {
  name: 'Roles',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        placeholder={'请输入角色名称'}
        getFieldNameForTreeId={() => 'parentId'}
        apiOptions={{
          apiName: 'getRoleTree',
          stateName: 'roleTree'
        }}
      >
        <TGContainer>
          <Functions slot={'functions'} />
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}角色'} />
            <ModalOfMenu modalTitle={'设置权限'} />
          </template>
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
