import './assets/styles/index.scss'
import Functions from './components/Functions'
import Table from './components/Table'
import Inquiry from './components/Inquiry'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'

export default {
  name: 'ConclusionLevel',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer>
        <Functions slot="functions" />
        <Inquiry slot="inquiry" />
        <Table slot="table" />
        <TGPagination slot="pagination" />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}体检项目结论等级'} />
        </template>
      </TGContainer>
    )
  }
}
