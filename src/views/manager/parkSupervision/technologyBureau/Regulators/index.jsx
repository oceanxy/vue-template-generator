import './assets/styles/index.scss'
import Inquiry from '@/views/manager/parkSupervision/technologyBureau/Regulators/components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from '@/views/manager/parkSupervision/technologyBureau/Regulators/components/Functions'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Table from '@/views/manager/parkSupervision/technologyBureau/Regulators/components/Table'
import Pagination from '@/views/manager/parkSupervision/technologyBureau/Regulators/components/Pagination'
import ModalOfEdit from '@/views/manager/parkSupervision/technologyBureau/Regulators/components/ModalOfEdit'

export default {
  name: 'Park',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-regulators-container">
        <Inquiry slot={'inquiry'} />
        <Functions slot={'functions'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <ModalOfEdit slot={'modals'} title={'{action}园区监管单位'} />
      </TGContainer>
    )
  }
}
