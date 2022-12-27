import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import TGContainer from '@/layouts/components/TGContainer'
import { getFileAdminForSchoolTreeId, getSchoolTreeIcon } from '@/utils/projectHelpers'
import dynamicState from '@/mixins/dynamicState'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'Buildings',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        placeholder={'请输入学校名称'}
        getCustomIcon={getSchoolTreeIcon}
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
            <ModalOfEdit modalTitle={'{action}楼栋'} />
          </template>
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
