import './assets/styles/index.scss'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfDetails from './components/ModalOfDetails'

export default {
  name: 'ReportAudit',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainerWithParkSider contentClass="bnm-report-audit-container">
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'报表审核'} />
            <ModalOfDetails modalTitle={'详情'} />
          </template>
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
