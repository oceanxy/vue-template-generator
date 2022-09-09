import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import TGContainer from '@/layouts/components/TGContainer'
import dynamicState from '@/mixins/dynamicState'
import Chart from './components/Chart'
import Inquiry from './components/Inquiry'
import Table from './components/Table'
import TGPagination from '@/components/TGPagination'
import ModalOfDetails from './components/ModalOfDetails'
import ChartTitle from './components/ChartTitle'

export default {
  name: 'InvoiceStatistics',
  mixins: [dynamicState()],
  render() {
    return (
      <div class={'bnm-invoice-statistics-container'}>
        <BNContainer
          width={'100%'}
          modalTitle={<ChartTitle />}
          showBoxShadow={false}
          class={'bnm-invoice-statistics-chart'}
        >
          <Chart />
        </BNContainer>
        <BNContainer
          width={'100%'}
          modalTitle={'企业开票记录'}
          showBoxShadow={false}
          class={'bnm-invoice-statistics-table'}
        >
          <TGContainer class={'bnm-invoice-statistics-content'}>
            <Inquiry slot={'inquiry'} />
            <Table slot={'table'} />
            <TGPagination slot={'pagination'} />
            <template slot={'modals'}>
              <ModalOfDetails modalTitle={'开票明细'} />
            </template>
          </TGContainer>
        </BNContainer>
      </div>
    )
  }
}
