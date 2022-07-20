import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfDetail from './components/ModalOfDetail'
import Functions from './components/Functions'
export default {
  name: 'ConferenceRoomStatistics',
  mixins: [dynamicState(store, dynamicModules)],
  methods: {},
  render() {
    return (
      <TGContainer class="bnm-conferenceroom-statistics-container">
        <Inquiry slot={'inquiry'} />
        <Functions slot="functions"></Functions>
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <ModalOfDetail slot={'modals'} modalTitle={'预约明细'} />
      </TGContainer>
    )
  }
}
