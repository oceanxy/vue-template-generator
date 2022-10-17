import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import BNContainerWithSider from '@/components/BNContainerWithSider'

export default {
  name: 'ConferenceRoomSubscribe',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainerWithSider
        contentClass="bnm-conferenceroom-subscribe-container"
        apiOptions={{
          apiName: 'getMeetingRoomTree',
          stateName: 'meetingRoomTree',
          moduleName: this.moduleName
        }}
        treeIdField={'treeId'}
        notNoneMode={true}
      >
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <ModalOfEdit
            slot={'modals'}
            modalTitle={'{action}预约'}
          />
        </TGContainer>
      </BNContainerWithSider>
    )
  }
}
