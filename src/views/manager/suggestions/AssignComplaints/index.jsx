import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfAssign from './components/ModalOfAssign'
import ModalOfProcess from './components/ModalOfProcess'

export default {
  name: 'AssignComplaints',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-assign-complaints-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfAssign modalTitle={'分配/转移'} />
          <ModalOfProcess modalTitle={'处理'} />
        </template>
      </TGContainer>
    )
  }
}
