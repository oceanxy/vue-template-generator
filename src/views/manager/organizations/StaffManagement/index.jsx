import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import ModalOfEdit from './components/ModalOfEdit'
import TGPagination from '@/components/TGPagination'
import ModalOfEditPassword from './components/ModalOfEditPassword'
import { getOrganizationTreeIcon } from '@/utils/projectHelpers'

export default {
  name: 'StaffManagement',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        placeholder={'请输入组织机构名称'}
        getCustomIcon={getOrganizationTreeIcon}
        getFieldNameForTreeId={() => 'orgId'}
        injectSearchParamsOfTable={node => ({ type: node.type })}
        apiOptions={{
          apiName: 'getOrganizationTree',
          stateName: 'organizationTree'
        }}
      >
        <TGContainer>
          <Functions slot={'functions'} />
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}职员'} />
            <ModalOfEditPassword modalTitle={'修改密码'} />
          </template>
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
