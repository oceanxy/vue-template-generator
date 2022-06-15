import './assets/styles/index.scss'
import Inquiry from '@/views/manager/parkSupervision/technologyBureau/ExpansionArea/components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from '@/views/manager/parkSupervision/technologyBureau/ExpansionArea/components/Functions'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Table from '@/views/manager/parkSupervision/technologyBureau/ExpansionArea/components/Table'
import Pagination from '@/views/manager/parkSupervision/technologyBureau/ExpansionArea/components/Pagination'
import ModalOfEdit from '@/views/manager/parkSupervision/technologyBureau/ExpansionArea/components/ModalOfEdit'

export default {
  name: 'Park',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-expanded-area-container">
        <Inquiry slot={'inquiry'} />
        <Functions slot={'functions'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <ModalOfEdit slot={'modals'} title={'{action}拓展区'} />
      </TGContainer>
    )
  }
}
