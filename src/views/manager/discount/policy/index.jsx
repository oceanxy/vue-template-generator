import './assets/styles/index.scss'
import Inquiry from './components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Table from './components/Table'
import Pagination from './components/Pagination'
import Functions from './components/Functions'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'DiscountPolicy',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-discount-policy-container">
        <Inquiry slot={'inquiry'} />
        <Functions slot="functions"></Functions>
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}优惠政策'}></ModalOfEdit>
        </template>
      </TGContainer>
    )
  }
}
