import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import dynamicState from '@/mixins/dynamicState'
import TGPagination from '@/components/TGPagination'
import TGContainer from '@/layouts/components/TGContainer'
import Table from './components/Table'

export default {
  name: 'BookMeetingRoomRecords',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainer
        class="bn-bookmeeting-roomrecords"
        modalTitle="会议室预约 > 我的预约记录"
      >
        <TGContainer>
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
        </TGContainer>
      </BNContainer>
    )
  }
}
