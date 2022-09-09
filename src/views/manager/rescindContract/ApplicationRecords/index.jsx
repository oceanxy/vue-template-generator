import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfDetails from './components/ModalOfDetails'

export default {
  name: 'ApplicationRecords',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-application-records-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <ModalOfDetails slot={'modals'} modalTitle={'解约申请详情'} />
      </TGContainer>
    )
  }
}
