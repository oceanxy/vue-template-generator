import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Functions from './components/Functions'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfPreview from './components/ModalOfPreview'

export default {
  name: 'DataCollectionTemplates',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-data-collection-templates-container">
        <Inquiry slot={'inquiry'} />
        <Functions slot={'functions'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}模版'} />
          <ModalOfPreview modalTitle={'模版项目'} />
        </template>
      </TGContainer>
    )
  }
}
