import './assets/styles/index.scss'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfContractHistory from './components/ModalOfContractHistory'

export default {
  name: 'HousingResources',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainerWithParkSider contentClass="bnm-housing-resources-container">
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}房源'} />
            <ModalOfContractHistory modalTitle={'签约历史查询'} />
          </template>
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
