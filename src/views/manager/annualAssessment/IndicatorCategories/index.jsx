import './assets/styles/index.scss'
import BNContainerWithIndicatorCategorySider from '@/components/BNContainerWithIndicatorCategorySider'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'

export default {
  name: 'IndicatorCategories',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainerWithIndicatorCategorySider contentClass="bnm-indicator-categories-container">
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}指标类别'} />
          </template>
        </TGContainer>
      </BNContainerWithIndicatorCategorySider>
    )
  }
}
