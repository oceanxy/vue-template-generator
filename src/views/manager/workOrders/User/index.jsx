import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'WorkOrderUser',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-workorder-user-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <ModalOfEdit
          slot={'modals'}
          modalTitle={'{action}人员'}
        />
      </TGContainer>
    )
  }
}
