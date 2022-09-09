import './index.scss'
import Table from '@/views/client/finance/Invoices/components/Table'
import BNContainer from '@/components/BNContainer'
import dynamicState from '@/mixins/dynamicState'
import TGContainer from '@/layouts/components/TGContainer'

export default {
  name: 'WebInvoices',
  mixins: [dynamicState()],
  render() {
    return (
      <BNContainer modalTitle="我的发票" contentClass="bn-web-invoices-container">
        <TGContainer>
          <Table slot={'table'} />
        </TGContainer>
      </BNContainer>
    )
  }
}
