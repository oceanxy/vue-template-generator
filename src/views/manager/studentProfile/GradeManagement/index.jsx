import './assets/styles/index.scss'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import Functions from './components/Functions'
import Table from './components/Table'
import Inquiry from './components/Inquiry'
import TGPagination from '@/components/TGPagination'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import { getFieldNameForSchoolTreeId } from '@/utils/auxiliaryFunction'

export default {
  name: 'GradeManagement',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
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
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
