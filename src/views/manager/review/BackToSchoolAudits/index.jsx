import dynamicState from '@/mixins/dynamicState'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import { getOrganizationTreeIcon } from '@/utils/projectHelpers'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import ModalOfReview from './components/ModalOfReview'
import TGPagination from '@/components/TGPagination'

export default {
  name: 'BackToSchoolAudits',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        placeholder={'请输入学校名称'}
        getCustomIcon={getOrganizationTreeIcon}
        getFieldNameForTreeId={() => 'orgId'}
        injectSearchParamsOfTable={dataSource => ({ orgType: dataSource.type })}
        apiOptions={{
          stateName: 'dutyClassTree',
          apiName: 'getDutyClassTree'
        }}
      >
        <TGContainer>
          <Functions slot={'functions'} />
          <Inquiry slot={'others'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <ModalOfReview
            slot={'modals'}
            modalTitle={'返校审核'}
          />
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
