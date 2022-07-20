import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Functions from './components/Functions'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfReportItems from './components/ModalOfReportItems'
import ModalOfReportSwitch from './components/ModalOfReportSwitch'

export default {
  name: 'ReportForms',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-report-forms-container">
        <Inquiry slot={'inquiry'} />
        <Functions slot={'functions'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}报表'} />
          <ModalOfReportItems modalTitle={'填报项'} />
          <ModalOfReportSwitch modalTitle={'{action}报表'} />
        </template>
      </TGContainer>
    )
  }
}
