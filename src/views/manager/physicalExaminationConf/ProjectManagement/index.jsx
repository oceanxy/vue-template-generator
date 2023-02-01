import './assets/styles/index.scss'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import Functions from './components/Functions'
import Table from './components/Table'
import Inquiry from './components/Inquiry'
import ModalOfEdit from './components/ModalOfEdit'
import TGPagination from '@/components/TGPagination'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import { getFieldNameForMedicallyAdmin, getExaminedDisposeTreeIcon } from '@/utils/projectHelpers'


export default {
  name: 'ProjectManagement',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        getCustomIcon={getExaminedDisposeTreeIcon}
        getFieldNameForTreeId={getFieldNameForMedicallyAdmin}
        // getFieldNameForTreeId={() => 'orgId'}
        injectSearchParamsOfTable={dataSource => ({ orgType: dataSource.type })}
        apiOptions={{
          apiName: 'getExamineCatalogTree',
          stateName: 'examineCatalogTree',
          moduleName: 'physical'
        }}
      >
        <TGContainer>
          <Functions slot="functions" />
          <Inquiry slot="inquiry" />
          <Table slot="table" />
          <TGPagination slot="pagination" />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}体检项目'} />
          </template>
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
