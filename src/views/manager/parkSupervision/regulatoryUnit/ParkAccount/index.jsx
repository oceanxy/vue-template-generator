import './assets/styles/index.scss'
import Inquiry from '@/views/manager/parkSupervision/regulatoryUnit/ParkAccount/components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from '@/views/manager/parkSupervision/regulatoryUnit/ParkAccount/components/Functions'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Table from '@/views/manager/parkSupervision/regulatoryUnit/ParkAccount/components/Table'
import Pagination from '@/views/manager/parkSupervision/regulatoryUnit/ParkAccount/components/Pagination'
import ModalOfEdit from '@/views/manager/parkSupervision/regulatoryUnit/ParkAccount/components/ModalOfEdit'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'

export default {
  name: 'Park',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <BNContainerWithParkSider contentClass={'bnm-park-account-container'}>
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Functions slot={'functions'} />
          <Table slot={'table'} />
          <Pagination slot={'pagination'} />
          <ModalOfEdit slot={'modals'} title={'{action}账号信息'} />
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
