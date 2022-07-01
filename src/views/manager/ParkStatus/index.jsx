import './index.scss'
import BNContainer from '@/components/BNContainer'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import MeetingRooms from './components/MeetingRooms'
import Inquiry from './components/Inquiry'
import Floors from './components/Floors'
import Calendar from './components/Calendar'
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
          <Calendar slot="sider" />
        </TGContainerWithSider>
      </div>
    )
  }
}
