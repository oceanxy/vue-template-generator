import './assets/styles/index.scss'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Inquiry from '@/views/manager/basis/Buildings/components/Inquiry'
import Functions from '@/views/manager/basis/Buildings/components/Functions'
import Table from '@/views/manager/basis/Buildings/components/Table'
import Pagination from '@/views/manager/basis/Buildings/components/Pagination'
import ModalOfEdit from '@/views/manager/basis/Buildings/components/ModalOfEdit'

export default {
  name: 'Buildings',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-buildings-container">
        <Inquiry slot={'inquiry'} />
        <Functions slot={'functions'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <ModalOfEdit slot={'modals'} title={'{action}楼栋'} />
      </TGContainer>
    )
  }
}
