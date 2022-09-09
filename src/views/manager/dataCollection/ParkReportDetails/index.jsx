import './assets/styles/index.scss'
import Inquiry from './components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfDetails from './components/ModalOfDetails'
import Functions from './components/Functions'

export default {
  name: 'ParkReportDetails',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-park-report-details-container">
        <Functions slot={'functions'} />
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfDetails modalTitle={'查看详情'} />
        </template>
      </TGContainer>
    )
  }
}
