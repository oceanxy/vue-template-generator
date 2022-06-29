import './assets/styles/index.scss'
import store, { dynamicModules } from '@/store/manager'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Inquiry from './components/Inquiry'
import Functions from './components/Functions'
import Pagination from './components/Pagination'
import ModalOfEdit from './components/ModalOfEdit'
import Table from './components/Table'

export default {
  name: 'Parks',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-parks-container">
        <Inquiry slot={'inquiry'} />
        <Functions slot={'functions'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <ModalOfEdit slot={'modals'} modalTitle={'{action}园区'} />
      </TGContainer>
    )
  }
}
