import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfDetail from './components/ModalOfDetail'

export default {
  name: 'ConferenceRoomStatistics',
  mixins: [dynamicState()],
  methods: {},
  render() {
    return (
      <TGContainer class="bnm-conferenceroom-statistics-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <ModalOfDetail slot={'modals'} modalTitle={'预约明细'} />
      </TGContainer>
    )
  }
}
