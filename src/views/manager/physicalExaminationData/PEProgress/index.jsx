import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfDetails from './components/ModalOfDetails'
import { getFieldNameForSchoolTreeId } from '@/utils/projectHelpers'

export default {
  name: 'PEProgress',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        contentClass="fe-p-e-progress-container"
        getTreeIdField={getFieldNameForSchoolTreeId}
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
            <ModalOfDetails modalTitle={'详细数据'} />
          </template>
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
