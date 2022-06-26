import './assets/styles/index.scss'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Inquiry from './components/Inquiry'
import Functions from './components/Functions'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfContractHistory from './components/ModalOfContractHistory'

export default {
  name: 'HousingResources',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <BNContainerWithParkSider contentClass="bnm-housing-resources-container">
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Functions slot={'functions'} />
          <Table slot={'table'} />
          <Pagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit title={'{action}房源'} />
            <ModalOfContractHistory title={'签约历史查询'} />
          </template>
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
