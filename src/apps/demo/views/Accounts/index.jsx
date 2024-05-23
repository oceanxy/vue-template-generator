import TGContainerWithTable from '@/components/TGContainerWithTable'
import dynamicState from '@/mixins/dynamicState'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import Functions from './components/Functions'
import ModalOfEditPassword from './components/ModalOfEditPassword'

export default {
  name: 'Accounts',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTable>
        <Functions slot={'functions'} />
        <Inquiry slot={'inquiry'} />
        <Table slot={'table'} />
        <TGPagination slot={'pagination'} />
        <template slot={'modals'}>
          <ModalOfEdit modalTitle={'{action}账户'} />
          <ModalOfEditPassword modalTitle={'修改密码'} visibilityFieldName={'visibilityOfResetPwd'} />
        </template>
      </TGContainerWithTable>
    )
  }
}
