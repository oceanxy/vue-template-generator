import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'ConferenceRoomManage',
  mixins: [dynamicState(store, dynamicModules)],
  methods: {},
  render() {
    return (
      <TGContainer class="bnm-conferenceroom-manage-container">
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <Pagination slot={'pagination'} />
        <ModalOfEdit slot={'modals'} modalTitle={'{action}会议室'} />
      </TGContainer>
    )
  }
}
