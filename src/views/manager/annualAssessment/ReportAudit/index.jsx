import './assets/styles/index.scss'
import BNContainerWithIndicatorCategorySider from '@/components/BNContainerWithIndicatorCategorySider'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Inquiry from './components/Inquiry'
import Functions from './components/Functions'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'ReportAudit',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <BNContainerWithIndicatorCategorySider contentClass="bnm-report-audit-container">
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Functions slot={'functions'} />
          <Table slot={'table'} />
          <Pagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}指标类别'} />
          </template>
        </TGContainer>
      </BNContainerWithIndicatorCategorySider>
    )
  }
}
