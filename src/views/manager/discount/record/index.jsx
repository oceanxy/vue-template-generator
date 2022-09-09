import './assets/styles/index.scss'
import Inquiry from './components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfEnterprise from '../components/ModalOfEnterprise'

export default {
  name: 'DiscountRecord',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-discount-record-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}优惠记录'}></ModalOfEdit>
          <ModalOfEnterprise modalTitle={'企业详情'}></ModalOfEnterprise>
        </template>
      </TGContainer>
    )
  }
}
