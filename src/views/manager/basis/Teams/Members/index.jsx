import './assets/styles/index.scss'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from '@/views/manager/basis/Teams/Members/components/Inquiry'
import Functions from '@/views/manager/basis/Teams/Members/components/Functions'
import Table from '@/views/manager/basis/Teams/Members/components/Table'
import Pagination from '@/views/manager/basis/Teams/Members/components/Pagination'
import ModalOfEdit from '@/views/manager/basis/Teams/Members/components/ModalOfEdit'
import store, { dynamicModules } from '@/store/manager'
import dynamicState from '@/mixins/dynamicState'

export default {
  name: 'teamMembers',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class={'bnm-team-members-container'}>
        <Inquiry slot={'inquiry'} />
        <Functions slot={'functions'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <ModalOfEdit slot={'modals'} title={'{action}团队成员'} />
      </TGContainer>
    )
  }
}
