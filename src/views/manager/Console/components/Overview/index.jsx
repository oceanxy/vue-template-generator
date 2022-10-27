import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import Charts from './Charts'
import Cards from './Cards'
import BMIChart from './BMIChart'

export default {
  render() {
    return (
      <BNContainer
        width={'100%'}
        class={'pe-console-overview'}
        contentClass={'pe-console-overview-content'}
        modalTitle={'身高体重数据总览'}
      >
        <BMIChart />
        <Charts />
        <Cards />
      </BNContainer>
    )
  }
}
