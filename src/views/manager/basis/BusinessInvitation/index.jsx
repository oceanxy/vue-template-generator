import './assets/styles/index.scss'
import Inquiry from '@/views/manager/basis/BusinessInvitation/components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from '@/views/manager/basis/BusinessInvitation/components/Functions'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Table from '@/views/manager/basis/BusinessInvitation/components/Table'
import Pagination from '@/views/manager/basis/BusinessInvitation/components/Pagination'
import ModalOfEdit from '@/views/manager/basis/BusinessInvitation/components/ModalOfEdit'

export default {
  name: 'BusinessInvitations',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-business-invitations-container">
        <Inquiry slot={'inquiry'} />
        <Functions slot={'functions'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <ModalOfEdit slot={'modals'} title={'{action}招商人员'} />
      </TGContainer>
    )
  }
}
