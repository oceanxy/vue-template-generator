import dynamicState from '@/mixins/dynamicState'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import { getOrganizationTreeIcon } from '@/utils/projectHelpers'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from '@/views/manager/reportMedicalExamination/ReportOverview/components/ModalOfEdit'

export default {
  name: 'ReportDetails',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        placeholder={'请输入组织机构名称'}
        getCustomIcon={getOrganizationTreeIcon}
        getFieldNameForTreeId={() => 'orgId'}
        injectSearchParamsOfTable={dataSource => ({ orgType: dataSource.type })}
        apiOptions={{
          apiName: 'getOrganizationTree',
          stateName: 'organizationTree'
        }}
      >
        <TGContainer>
          <Functions slot={'functions'} />
          <Inquiry slot={'others'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <ModalOfEdit slot={'modals'} modalTitle={'{action}上报'} />
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
