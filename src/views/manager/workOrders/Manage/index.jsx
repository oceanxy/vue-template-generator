import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfDistribute from './components/ModalOfDistribute'

export default {
  name: 'WorkOrderManage',
  mixins: [dynamicState()],
  methods: {},
  render() {
    return (
      <TGContainer class="bnm-workorder-manage-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot="modals">
          <ModalOfEdit modalTitle={'{action}工单'} />
          <ModalOfDistribute modalTitle={'派单'} />
        </template>
      </TGContainer>
    )
  }
}
