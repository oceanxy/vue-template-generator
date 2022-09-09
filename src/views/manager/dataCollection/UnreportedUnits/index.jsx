import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfRemind from './components/ModalOfRemind'

export default {
  name: 'UnreportedUnits',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-unreported-units-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfRemind modalTitle={'催报'} />
        </template>
      </TGContainer>
    )
  }
}
