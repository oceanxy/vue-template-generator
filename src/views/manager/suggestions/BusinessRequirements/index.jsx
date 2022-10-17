import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfReply from './components/ModalOfReply'

export default {
  name: 'BusinessRequirements',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="bnm-business-requirements-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfReply modalTitle={'回复'} />
        </template>
      </TGContainer>
    )
  }
}
