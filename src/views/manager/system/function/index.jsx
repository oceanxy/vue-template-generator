import './assets/styles/index.scss'
import BNContainerWithSystem from '@/components/BNContainerWithSystem'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import MenuTree from '@/components/BNContainerWithSystem/components/MenuTree'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import Pagination from './components/Pagination'
import Functions from './components/Functions'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'SystemFunction',
  mixins: [dynamicState(store, dynamicModules)],
  methods: {
    onChangeTree(value) {
      const [menuId] = value

      this.$store.dispatch('setSearch', { payload: { menuId: menuId ?? '' }, moduleName: this.moduleName })
    }
  },
  render() {
    return (
      <BNContainerWithSystem contentClass={'bnm-system-function-container'}>
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Functions slot="functions"></Functions>
          <Table slot={'table'} />
          <Pagination slot={'pagination'} />
          <ModalOfEdit slot={'modals'} modalTitle={'{action}菜单'} />
        </TGContainer>
        <template slot="tree">
          <MenuTree onchange={this.onChangeTree}></MenuTree>
        </template>
      </BNContainerWithSystem>
    )
  }
}
