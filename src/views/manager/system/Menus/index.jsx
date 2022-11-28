import TGContainerWithTreeSider from '@/components/TGContainerWithTreeSider'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import Functions from './components/Functions'

export default {
  name: 'Menus',
  mixins: [dynamicState()],
  render() {
    return (
      <TGContainerWithTreeSider
        notNoneMode
        placeholder={'请输入菜单名称'}
        getFieldNameForTreeId={() => 'parentId'}
        apiOptions={{
          apiName: 'getMenuTree',
          stateName: 'menuTree'
        }}
      >
        <TGContainer>
          <Functions slot={'functions'} />
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <ModalOfEdit slot={'modals'} modalTitle={'{action}菜单'} />
        </TGContainer>
      </TGContainerWithTreeSider>
    )
  }
}
