import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfReview from './components/ModalOfReview'
import ModalOfDetails from './components/ModalOfDetails'

export default {
  name: 'CancellationReviewFromFinance',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <TGContainer class="bnm-cancellation-review-from-finance-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfReview modalTitle={'解约审核'} />
          <ModalOfDetails modalTitle={'账款明细'} />
        </template>
      </TGContainer>
    )
  }
}
