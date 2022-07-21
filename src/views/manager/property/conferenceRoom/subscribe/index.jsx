import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfEdit from './components/ModalOfEdit'
import Functions from './components/Functions'

export default {
  name: 'ConferenceRoomSubscribe',
  mixins: [dynamicState(store, dynamicModules)],
  methods: {},
  render() {
    return (
      <TGContainer class="bnm-conferenceroom-subscribe-container">
        <Inquiry slot={'inquiry'} />
        <Functions slot="functions"></Functions>
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <ModalOfEdit slot={'modals'} modalTitle={'{action}会议室'} />
      </TGContainer>
    )
  }
}
