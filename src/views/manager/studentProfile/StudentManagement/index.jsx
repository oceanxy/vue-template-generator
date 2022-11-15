import './assets/styles/index.scss'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import Functions from './components/Functions'
import Table from './components/Table'
import Inquiry from './components/Inquiry'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import { getFileAdminForSchoolTreeId } from '@/utils/projectHelpers'

export default {
  name: 'StudentManagement',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        getFieldNameForTreeId={getFileAdminForSchoolTreeId}
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
            <ModalOfEdit modalTitle={'{action}学生'} />
          </template>
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
