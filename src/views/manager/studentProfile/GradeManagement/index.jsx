import './assets/styles/index.scss'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import Functions from './components/Functions'
import Table from './components/Table'
import Inquiry from './components/Inquiry'
import ModalOfEdit from './components/ModalOfEdit'
import TGPagination from '@/components/TGPagination'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import { getSchoolTreeIcon } from '@/utils/projectHelpers'

export default {
  name: 'GradeManagement',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        getCustomIcon={getSchoolTreeIcon}
        getFieldNameForTreeId={() => 'orgId'}
        injectSearchParamsOfTable={dataSource => ({ orgType: dataSource.type })}
        apiOptions={{
          apiName: 'getSchoolTree',
          stateName: 'schoolTree',
          moduleName: 'schools'
        }}
      >
        <TGContainer>
          <Functions slot="functions" />
          <Inquiry slot="inquiry" />
          <Table slot="table" />
          <TGPagination slot="pagination" />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}年级'} />
          </template>
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
