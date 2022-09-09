import './assets/styles/index.scss'
import Inquiry from './components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'DiscountPolicy',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-discount-policy-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}优惠政策'}></ModalOfEdit>
        </template>
      </TGContainer>
    )
  }
}
