import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import icon from './assets/images/appointment-record.svg'
import { Button, Icon } from 'ant-design-vue'
import MeetingRoomCards from './components/MeetingRoomCards'
import dynamicState from '@/mixins/dynamicState'
import TGPagination from '@/components/TGPagination'
import TGContainer from '@/layouts/components/TGContainer'

export default {
  name: 'BookMeetingRoom',
  mixins: [dynamicState()],
  methods: {
    async toRecords() {
      await this.$router.push({ name: 'appointmentRecord' })
    }
  },
  render() {
    return (
      <BNContainer
        width="100%"
        class="bn-book-meeting-room"
        contentClass={'bn-book-meeting-grid'}
        modalTitle={
          <div class="title">
            会议室预约
            <Button type="link" class="btn" onClick={this.toRecords}>
              <Icon component={icon} />
              我的预约记录
            </Button>
          </div>
        }
      >
        <TGContainer>
          <MeetingRoomCards slot={'table'} />
          <TGPagination slot={'pagination'} />
        </TGContainer>
      </BNContainer>
    )
  }
}
