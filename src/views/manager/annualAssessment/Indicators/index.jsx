import './assets/styles/index.scss'
import BNContainerWithIndicatorCategorySider from '@/components/BNContainerWithIndicatorCategorySider'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfGrading from './components/ModalOfGrading'

export default {
  name: 'Indicators',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainerWithIndicatorCategorySider contentClass="bnm-indicator-categories-container">
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}指标'} />
            <ModalOfGrading modalTitle={'评分标准'} />
          </template>
        </TGContainer>
      </BNContainerWithIndicatorCategorySider>
    )
  }
}
