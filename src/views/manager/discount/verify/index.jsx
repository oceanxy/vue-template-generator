import './assets/styles/index.scss'
import Inquiry from './components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfAudit from './components/ModalOfAudit'
import ModalOfEnterprise from '../components/ModalOfEnterprise'
import ModalOfFile from '../components/ModalOfFile'

export default {
  name: 'DiscountVerify',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-discount-verify-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfAudit modalTitle={'{action}优惠记录'}></ModalOfAudit>
          <ModalOfEnterprise modalTitle={'企业详情'}></ModalOfEnterprise>
          <ModalOfFile modalTitle={'企业文件'}></ModalOfFile>
        </template>
      </TGContainer>
    )
  }
}
