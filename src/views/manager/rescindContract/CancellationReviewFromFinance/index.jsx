import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfReview from './components/ModalOfReview'
import ModalOfDetails from './components/ModalOfDetails'

export default {
  name: 'CancellationReviewFromFinance',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-cancellation-review-from-finance-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfReview modalTitle={'解约审核'} />
          <ModalOfDetails modalTitle={'账款明细'} />
        </template>
      </TGContainer>
    )
  }
}
