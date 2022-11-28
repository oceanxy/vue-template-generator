import './assets/styles/index.scss'
import Functions from './components/Functions'
import Table from './components/Table'
import Inquiry from './components/Inquiry'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOSchool from './components/ModalOSchool'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'

export default {
  name: 'ActivityManagement',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer>
        <Functions slot="functions" />
        <Inquiry slot="inquiry" />
        <Table slot="table" />
        <TGPagination slot="pagination" />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}体检活动'} />
          <ModalOSchool modalTitle={'添加学校'} />
        </template>
      </TGContainer>
    )
  }
}
