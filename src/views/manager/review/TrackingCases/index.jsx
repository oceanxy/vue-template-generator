import dynamicState from '@/mixins/dynamicState'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import { getOrganizationTreeIcon } from '@/utils/projectHelpers'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfDetails from './components/ModalOfDetails'

export default {
  name: 'TrackingCases',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        placeholder={'请输入学校名称'}
        getCustomIcon={getOrganizationTreeIcon}
        getFieldNameForTreeId={() => 'orgId'}
        injectSearchParamsOfTable={dataSource => ({ orgType: dataSource.type })}
        apiOptions={{ stateName: 'dutyClassTree', apiName: 'getDutyClassTree' }}
      >
        <TGContainer>
          <Functions slot={'functions'} />
          <Inquiry slot={'others'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <ModalOfDetails
            slot={'modals'}
            modalTitle={'详情'}
          />
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
