import './index.scss'
import BNContainer from '@/components/BNContainer'
import dynamicState from '@/mixins/dynamicState'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import MeetingRooms from './components/MeetingRooms'
import Inquiry from './components/Inquiry'
import Floors from './components/Floors'
import Calendar from './components/Calendar'
import ModalOfDetails from './components/ModalOfDetails'
import ModalOfTerminate from '@/views/manager/rescindContract/Contracts/components/ModalOfTerminate'
import ModalOfRenew from '@/views/manager/rescindContract/Contracts/components/ModalOfRenew'
import ModalOfBills from '@/views/manager/finance/ValidContracts/components/ModalOfBills'

export default {
  name: 'ParkStatus',
  mixins: [dynamicState()],
  render() {
    return (
      <div class="bnm-park-status">
        <BNContainer
          class="park-status-title-container"
          width="100%"
          modalTitle={<Inquiry />}
        />
        <TGContainerWithSider
          class="park-status-content"
          siderClass="park-status-sider"
        >
          <div
            class="park-status-main"
            slot="default"
          >
            <TGContainerWithSider siderClass="park-status-floor-container">
              <MeetingRooms slot={'default'} />
              <Floors slot={'sider'} />
            </TGContainerWithSider>
          </div>
          <Calendar slot="sider" />
          <template>
            <ModalOfTerminate modalTitle={'解约申请'} />
            <ModalOfRenew modalTitle={'续约申请'} />
            <ModalOfBills modalTitle={'待缴账单'} />
            <ModalOfDetails modalTitle={'场地详情'} />
          </template>
        </TGContainerWithSider>
      </div>
    )
  }
}
