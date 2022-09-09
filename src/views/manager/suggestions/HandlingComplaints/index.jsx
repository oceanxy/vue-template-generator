import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfAssign from '@/views/manager/suggestions/AssignComplaints/components/ModalOfAssign'
import ModalOfProcess from '@/views/manager/suggestions/AssignComplaints/components/ModalOfProcess'

export default {
  name: 'HandlingComplaints',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-handling-complaints-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfAssign modalTitle={'转出'} />
          <ModalOfProcess modalTitle={'处理'} />
        </template>
      </TGContainer>
    )
  }
}
