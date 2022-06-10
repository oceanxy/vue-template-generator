import './assets/styles/index.scss'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Inquiry from '@/views/manager/basis/HousingResources/components/Inquiry'
import Functions from '@/views/manager/basis/HousingResources/components/Functions'
import Table from '@/views/manager/basis/HousingResources/components/Table'
import Pagination from '@/views/manager/basis/HousingResources/components/Pagination'
import ModalOfEdit from '@/views/manager/basis/HousingResources/components/ModalOfEdit'

export default {
  name: 'HousingResources',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-housing-resources-container">
        <Inquiry slot={'inquiry'} />
        <Functions slot={'functions'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <ModalOfEdit slot={'modals'} title={'{action}房源'} />
      </TGContainer>
    )
  }
}
