import './index.scss'
import Table from '@/views/client/finance/Invoices/components/Table'
import BNContainer from '@/components/BNContainer'
import store, { dynamicModules } from '@/store/client'
import dynamicState from '@/mixins/dynamicState'

export default {
  name: 'WebInvoices',
  mixins: [dynamicState(store, dynamicModules)],
  data: () => ({}),
  methods: {},
  render() {
    return (
      <BNContainer modalTitle="我的发票" class="bn-web-invoices-container">
        <Table />
      </BNContainer>
    )
  }
}
