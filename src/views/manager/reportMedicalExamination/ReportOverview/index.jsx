import dynamicState from '@/mixins/dynamicState'
import { getOrganizationTreeIcon } from '@/utils/projectHelpers'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import ModalOfEdit from './components/ModalOfEdit'
import TGPagination from '@/components/TGPagination'
import ModalOfOneClickReport from './components/ModalOfOneClickReport'

export default {
  name: 'ReportOverview',
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
          <Inquiry slot={'others'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'新增上报'} />
            <ModalOfOneClickReport modalTitle={'一键上报'} />
          </template>
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
