import './assets/styles/index.scss'
import BNContainerWithSystem from '@/components/BNContainerWithSystem'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import OrganTree from '@/components/BNContainerWithSystem/components/OrganTree'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import Pagination from './components/Pagination'
import Functions from './components/Functions'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfResetPwd from './components/ModalOfResetPwd'

export default {
  name: 'SystemUser',
  mixins: [dynamicState(store, dynamicModules)],
  methods: {
    onChangeTree(value) {
      const [organId] = value
      this.$store.dispatch('setSearch', { payload: { organId: organId ?? '' }, moduleName: this.moduleName })
    }
  },
  render() {
    return (
      <BNContainerWithSystem contentClass={'bnm-system-user-container'}>
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Functions slot="functions"></Functions>
          <Table slot={'table'} />
          <Pagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}员工'} />
            <ModalOfResetPwd modalTitle={'重置密码'} />
          </template>
        </TGContainer>
        <template slot="tree">
          <OrganTree onchange={this.onChangeTree}></OrganTree>
        </template>
      </BNContainerWithSystem>
    )
  }
}
