import './assets/styles/index.scss'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import BNContainerWithParkSider from '@/components/BNContainerWithParkSider'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'

export default {
  name: 'ParkInfo',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainerWithParkSider contentClass={'bnm-park-info-container'}>
        <TGContainer>
          <Inquiry slot={'inquiry'} />
          <Table slot={'table'} />
          <TGPagination slot={'pagination'} />
        </TGContainer>
      </BNContainerWithParkSider>
    )
  }
}
