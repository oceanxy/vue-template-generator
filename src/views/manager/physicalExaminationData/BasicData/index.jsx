import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import ModalOfExportByTime from './components/ModalOfExportByTime'
import TGPagination from '@/components/TGPagination'
import { getFieldNameForSchoolTreeId } from '@/utils/projectHelpers'

export default {
  name: 'BasicData',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        contentClass="fe-basic-data-container"
        getFieldNameForTreeId={getFieldNameForSchoolTreeId}
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
            <ModalOfExportByTime modalTitle={'按时间导出'} />
          </template>
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
