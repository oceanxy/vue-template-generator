import './assets/styles/index.scss'
import BNContainerWithSystem from '@/components/BNContainerWithSystem'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import RoleTree from '@/components/BNContainerWithSystem/components/RoleTree'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import Pagination from './components/Pagination'
import Functions from './components/Functions'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfMenu from './components/ModalOfMenu'
export default {
  name: 'SystemRole',
  mixins: [dynamicState(store, dynamicModules)],
  methods: {
    onChangeTree(value) {
      const [menuId] = value
      this.$store.dispatch('setSearch', { payload: { menuId: menuId ?? '' }, moduleName: this.moduleName })
    }
  },
  render() {
    return (
      <BNContainerWithSystem contentClass={'bnm-system-role-container'}>
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Functions slot="functions"></Functions>
          <Table slot={'table'} />
          <Pagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}菜单'} />
            <ModalOfMenu modalTitle={'配置菜单'} />
          </template>
        </TGContainer>
        <template slot="tree">
          <RoleTree onchange={this.onChangeTree}></RoleTree>
        </template>
      </BNContainerWithSystem>
    )
  }
}
