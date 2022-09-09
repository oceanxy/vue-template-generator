import './assets/styles/index.scss'
import Inquiry from './components/Inquiry'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfReview from './components/ModalOfReview'

export default {
  name: 'RenewalApplication',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-renewal-application-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfReview modalTitle={'审核续约申请'} />
        </template>
      </TGContainer>
    )
  }
}
