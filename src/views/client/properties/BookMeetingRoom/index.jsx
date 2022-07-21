import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import icon from './assets/images/appointment-record.svg'
import { Button, Icon, Spin, Empty } from 'ant-design-vue'
import MeetingRoomCard from './components/MeetingRoomCard'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/client'
import Pagination from './components/Pagination'
import { mapAction, mapState } from '@/utils/store'

export default {
  name: 'BookMeetingRoom',
  mixins: [dynamicState(store, dynamicModules)],
  computed: {
    ...mapState(['loading', 'list'])
  },
  mounted() {
    this.getList({ moduleName: this.moduleName })
  },
  methods: {
    toRecords() {
      this.$router.push({ name: 'appointmentRecord' })
    },
    ...mapAction(['getList'])
  },
  render() {
    return (
      <BNContainer
        width="100%"
        class="bn-book-meeting-room"
        modalTitle={
          <div class="title">
            会议室预约
            <Button type="link" class="btn" onClick={this.toRecords}>
              <Icon component={icon} />
              我的预约记录
            </Button>
          </div>
        }>
        <Spin spinning={this.loading}>
          <div class="book-meeting-room-content">
            {this.list.map(item => {
              return <MeetingRoomCard occupied={item.roomStatus !== 1} data={item} />
            })}
          </div>
          {this.list.length === 0 ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}></Empty> : null}
          <br />
          <Pagination></Pagination>
        </Spin>
      </BNContainer>
    )
  }
}
