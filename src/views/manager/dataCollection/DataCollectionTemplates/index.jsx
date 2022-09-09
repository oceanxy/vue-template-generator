import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfPreview from './components/ModalOfPreview'

export default {
  name: 'DataCollectionTemplates',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-data-collection-templates-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}模版'} />
          <ModalOfPreview modalTitle={'模版项目'} />
        </template>
      </TGContainer>
    )
  }
}
