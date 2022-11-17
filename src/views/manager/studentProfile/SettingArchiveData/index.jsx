import './assets/styles/index.scss'
import Functions from './components/Functions'
import Table from './components/Table'
import Inquiry from './components/Inquiry'
import ModalOfEdit from './components/ModalOfEdit'
import TGPagination from '@/components/TGPagination'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'

export default {
  name: 'SettingArchiveData',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainer>
        <Functions slot="functions" />
        <Inquiry slot="inquiry" />
        <Table slot="table" />
        <TGPagination slot="pagination" />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}体检数据存档日志'} />
        </template>
      </TGContainer>
    )
  }
}
