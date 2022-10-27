import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from '../XcxUser/components/Inquiry'
import Table from '../XcxUser/components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from '../XcxUser/components/ModalOfEdit'

export default {
  name: 'SystemXcxUser',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer class="tg-system-xcxuser-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}用户'} />
        </template>
      </TGContainer>

    )
  }
}
