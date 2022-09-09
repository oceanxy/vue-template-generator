import './assets/css/index.scss'
import BNContainer from '@/components/BNContainer'
import TGPagination from '@/components/TGPagination'
import Table from './components/Table'
import dynamicState from '@/mixins/dynamicState'

export default {
  name: 'ParkNews',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainer
        width="100%"
        modalTitle="园区新闻"
        contentClass="bn-park-news-content"
      >
        <Table />
        <TGPagination />
      </BNContainer>
    )
  }
}
