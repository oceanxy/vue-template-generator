import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import TGContainer from '@/layouts/components/TGContainer'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'

export default {
  name: 'ScoreStatistics',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainerWithParkSider contentClass={'bnm-score-statistics-container'}>
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
