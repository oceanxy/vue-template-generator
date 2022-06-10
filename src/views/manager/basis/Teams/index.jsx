import './assets/styles/index.scss'
import Inquiry from '@/views/manager/basis/Teams/components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from '@/views/manager/basis/Teams/components/Functions'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Table from '@/views/manager/basis/Teams/components/Table'
import Pagination from '@/views/manager/basis/Teams/components/Pagination'
import ModalOfEdit from '@/views/manager/basis/Teams/components/ModalOfEdit'

export default {
  name: 'Teams',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-teams-container">
        <Inquiry slot={'inquiry'} />
        <Functions slot={'functions'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <ModalOfEdit slot={'modals'} title={'{action}团队'} />
      </TGContainer>
    )
  }
}
