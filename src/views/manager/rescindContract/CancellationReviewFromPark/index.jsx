import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfReview from './components/ModalOfReview'

export default {
  name: 'CancellationReviewFromPark',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-cancellation-review-from-park-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <ModalOfReview slot={'modals'} modalTitle={'解约审核'} />
      </TGContainer>
    )
  }
}
