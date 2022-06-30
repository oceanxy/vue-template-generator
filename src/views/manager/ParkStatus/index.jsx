import './index.scss'
import BNContainer from '@/components/BNContainer'
import { Calendar } from 'ant-design-vue'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import MeetingRooms from '@/views/manager/ParkStatus/components/MeetingRooms'
import Inquiry from './components/Inquiry'
import Floors from '@/views/manager/ParkStatus/components/Floors'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'

export default {
  name: 'ParkStatus',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <div class="bnm-park-status">
        <BNContainer
          class="park-status-title-container"
          width="100%"
          modalTitle={<Inquiry />}
        />
        <TGContainerWithSider class="park-status-content" siderClass="park-status-sider">
          <div class="park-status-main" slot="default">
            <TGContainerWithSider siderClass="park-status-floor-container">
              <MeetingRooms slot={'default'} />
              <Floors slot={'sider'} />
            </TGContainerWithSider>
          </div>
          <BNContainer
            width="100%"
            class="park-status-datetime-picker"
            modalTitle="选择日期"
            slot="sider"
          >
            <Calendar fullscreen={false} />
          </BNContainer>
        </TGContainerWithSider>
      </div>
    )
  }
}
