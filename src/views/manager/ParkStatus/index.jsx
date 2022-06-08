import './index.scss'
import BNContainer from '@/components/BNContainer'
import { Button, Calendar } from 'ant-design-vue'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import MeetingRoomCard from '@/views/manager/ParkStatus/components/MeetingRoomCard'

export default {
  render() {
    return (
      <div class="bnm-park-status">
        <BNContainer
          class='park-status-title-container'
          width="100%"
          title={
            <div class="park-status-title">
              <span>园区实时状态</span>
              <Button.Group class="park-status-btns">
                <Button type="primary" class="custom-button">全部</Button>
                <Button class="custom-button">空闲</Button>
                <Button class="custom-button">已签约</Button>
                <Button class="custom-button">已预订</Button>
              </Button.Group>
            </div>
          }
        />
        <TGContainerWithSider
          class="park-status-content"
          siderClass="park-status-sider"
        >
          <div
            class="park-status-main"
            slot="default"
          >
            <TGContainerWithSider
              siderClass="park-status-floor-container"
            >
              <div
                class="park-status-main--main"
                slot="default"
              >
                <MeetingRoomCard status={0} />
                <MeetingRoomCard status={1} />
                <MeetingRoomCard status={2} />
                <MeetingRoomCard />
                <MeetingRoomCard />
                <MeetingRoomCard />
                <MeetingRoomCard />
                <MeetingRoomCard />
              </div>
              <ul
                class="park-status-main--floor"
                slot="sider"
              >
                <li>所有</li>
                <li>5F</li>
                <li>4F</li>
                <li>3F</li>
                <li>2F</li>
                <li>1F</li>
                <li>LG</li>
                <li>-1F</li>
                <li>-2F</li>
                <li>-3F</li>
              </ul>
            </TGContainerWithSider>
          </div>
          <BNContainer
            width="100%"
            class="park-status-datetime-picker"
            title="选择日期"
            slot="sider"
          >
            <Calendar fullscreen={false} />
          </BNContainer>
        </TGContainerWithSider>
      </div>
    )
  }
}
