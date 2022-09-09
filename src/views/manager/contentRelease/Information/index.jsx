import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'ContentReleaseInformation',
  mixins: [dynamicState()],
  methods: {},
  render() {
    return (
      <TGContainer class="bnm-contentrelease-information-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot="modals">
          <ModalOfEdit modalTitle={'{action}资讯'} />
        </template>
      </TGContainer>
    )
  }
}
