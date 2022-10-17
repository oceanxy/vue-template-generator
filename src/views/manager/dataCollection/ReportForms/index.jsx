import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfReportItems from './components/ModalOfReportItems'
import ModalOfReportSwitch from './components/ModalOfReportSwitch'
import ModalOfPreview from './components/ModalOfPreview'

export default {
  name: 'ReportForms',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-report-forms-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}报表'} />
          <ModalOfReportItems modalTitle={'填报项'} />
          <ModalOfReportSwitch modalTitle={'{action}报表'} />
          <ModalOfPreview modalTitle={'预览报表'} />
        </template>
      </TGContainer>
    )
  }
}
