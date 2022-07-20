import './assets/styles/index.scss'
import BNContainerWithIndicatorCategorySider from '@/components/BNContainerWithIndicatorCategorySider'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import Inquiry from './components/Inquiry'
import Functions from './components/Functions'
import Table from './components/Table'
import Pagination from './components/Pagination'
import ModalOfEdit from './components/ModalOfEdit'
import ModalOfGrading from './components/ModalOfGrading'

export default {
  name: 'Indicators',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <BNContainerWithIndicatorCategorySider contentClass="bnm-indicator-categories-container">
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Functions slot={'functions'} />
          <Table slot={'table'} />
          <Pagination slot={'pagination'} />
          <template slot={'modals'}>
            <ModalOfEdit modalTitle={'{action}指标'} />
            <ModalOfGrading modalTitle={'评分标准'} />
          </template>
        </TGContainer>
      </BNContainerWithIndicatorCategorySider>
    )
  }
}
