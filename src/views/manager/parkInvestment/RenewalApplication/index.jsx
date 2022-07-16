import './assets/styles/index.scss'
import Inquiry from './components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfReview from './components/ModalOfReview'

export default {
  name: 'RenewalApplication',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-renewal-application-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfReview modalTitle={'审核续约申请'} />
        </template>
      </TGContainer>
    )
  }
}
