import './assets/styles/index.scss'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfResetPwd from './components/ModalOfResetPwd'

export default {
  name: 'SystemUser',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainerWithSider
        contentClass={'tg-sider-container'}
        apiOptions={{
          apiName: 'getOrganizationTree',
          stateName: 'organizationTree',
          moduleName: 'common'
        }}
        treeIdField={'organId'}
        notNoneMode={true}
      >
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}员工'} />
            <ModalOfResetPwd modalTitle={'重置密码'} />
          </template>
        </TGContainer>
      </BNContainerWithSider>
    )
  }
}
