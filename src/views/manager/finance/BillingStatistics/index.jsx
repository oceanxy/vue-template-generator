import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import BarChart from './components/BarChart'
import PieChart from './components/PieChart'
import Table from './components/Table'
import ChartTitle from './components/ChartTitle'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import TableTitle from './components/TableTitle'
import Summary from './components/Summary'

export default {
  name: 'BillingStatistics',
  mixins: [dynamicState()],
  render() {
    return (
      <div class={'bnm-billing-statistics-container'}>
        <BNContainer
          width={'100%'}
          modalTitle={<ChartTitle />}
          showBoxShadow={false}
          class={'bnm-billing-statistics-chart'}
        >
          <BarChart />
        </BNContainer>
        <BNContainer
          width={'100%'}
          modalTitle={<TableTitle slot={'inquiry'} />}
          showBoxShadow={false}
          class={'bnm-billing-statistics-table'}
        >
          <TGContainerWithSider siderClass={'sider'}>
            <TGContainer
              slot={'default'}
              class={'bnm-billing-statistics-content'}
            >
              <Summary slot={'others'} />
              <Table slot={'table'} />
            </TGContainer>
            <PieChart slot={'sider'} />
          </TGContainerWithSider>
        </BNContainer>
      </div>
    )
  }
}
