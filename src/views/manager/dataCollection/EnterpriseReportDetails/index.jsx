import './assets/styles/index.scss'
import Inquiry from './components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfDetails from './components/ModalOfDetails'
import Functions from './components/Functions'

export default {
  name: 'EnterpriseReportDetails',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-enterprise-report-details-container">
        <Functions slot={'functions'} />
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfDetails modalTitle={'查看详情'} />
        </template>
      </TGContainer>
    )
  }
}
