import './assets/styles/index.scss'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import Functions from './components/Functions'
import Table from './components/Table'
import Inquiry from './components/Inquiry'
import TGPagination from '@/components/TGPagination'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'

export default {
  name: 'BasicData',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        contentClass="fe-basic-data-container"
        getTreeIdField={treeHierarchy => {
          switch (treeHierarchy) {
            case 3:
              return 'peObjOrgId'
            case 2:
              return 'schoolStreetId'
            case 1:
            default:
              return 'schoolCountyId'
          }
        }}
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
