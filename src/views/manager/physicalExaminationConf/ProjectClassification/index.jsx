import './assets/styles/index.scss'
import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import Functions from './components/Functions'
import Table from './components/Table'
import Inquiry from './components/Inquiry'
import TGPagination from '@/components/TGPagination'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'

export default {
  name: 'ProjectClassification',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        apiOptions={{
          apiName: 'getExamineCatalogTree',
          stateName: 'examineCatalogTree',
          moduleName: 'physical'
        }}
      >
        <Functions slot="functions" />
        <TGContainer>
          <Inquiry slot="inquiry" />
          <Table slot="table" />
          <TGPagination slot="pagination" />
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}