import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Functions from './components/Functions'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import ModalOfReview from './components/ModalOfReview'
import TGPagination from '@/components/TGPagination'

export default {
  name: 'BackToSchoolAudits',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer>
        <Functions slot={'functions'} />
        <Inquiry slot={'others'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfReview modalTitle={'返校审核'} />
        </template>
      </TGContainer>
    )
  }
}
