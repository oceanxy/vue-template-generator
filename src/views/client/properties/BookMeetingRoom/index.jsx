import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import icon from './assets/images/appointment-record.svg'
import { Button, Icon } from 'ant-design-vue'
import MeetingRoomCard from './components/MeetingRoomCard'

export default {
  methods: {
    toRecords() {
      this.$router.push({ name: 'appointmentRecord' })
    }
  },
  render() {
    return (
      <BNContainer
        width="100%"
        class="bn-book-meeting-room"
        contentClass="book-meeting-room-content"
        title={
          <div class="title">
            会议室预约
            <Button type="link" class="btn" onClick={this.toRecords}>
              <Icon component={icon} />
              我的预约记录
            </Button>
          </div>
        }
      >
        <MeetingRoomCard occupied />
        <MeetingRoomCard />
        <MeetingRoomCard />
      </BNContainer>
    )
  }
}
