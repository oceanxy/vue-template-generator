import './assets/styles/index.scss'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import Functions from './components/Functions'
import Table from './components/Table'
import Inquiry from './components/Inquiry'
import ModalOfEdit from './components/ModalOfEdit'
import TGPagination from '@/components/TGPagination'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import { getFieldNameForSchoolGroupType } from '@/utils/projectHelpers'

export default {
  name: 'SchoolManagement',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        getFieldNameForTreeId={getFieldNameForSchoolGroupType}
        apiOptions={{
          apiName: 'getStreetTree',
          stateName: 'streetTree',
          moduleName: 'streets'
        }}
      >
        <TGContainer>
          <Functions slot="functions" />
          <Inquiry slot="inquiry" />
          <Table slot="table" />
          <TGPagination slot="pagination" />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}学校'} />
          </template>
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
