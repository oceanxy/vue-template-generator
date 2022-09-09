import './assets/styles/index.scss'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfUpdatePassword from './components/ModalOfUpdatePassword'

export default {
  name: 'ParkAccounts',
  mixins: [dynamicState()],
  render () {
    return (
      <BNContainerWithParkSider contentClass={'bnm-park-accounts-container'}>
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}中心账号信息'} />
            <ModalOfUpdatePassword modalTitle={'重置密码'} />
          </template>
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
