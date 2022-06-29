import './assets/styles/index.scss'
import store, { dynamicModules } from '@/store/manager'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Functions from './components/Functions'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'Merchants-TeamMembers',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class={'bnm-team-members-container'}>
        <Inquiry slot={'inquiry'} />
        <Functions slot={'functions'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <ModalOfEdit slot={'modals'} modalTitle={'{action}团队成员'} />
      </TGContainer>
    )
  }
}
