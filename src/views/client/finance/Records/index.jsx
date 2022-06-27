import './assets/styles/index.scss'
import Table from '@/views/client/finance/Records/components/Table'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/client'
import BNContainer from '@/components/BNContainer'
import ModalForDetails from '@/views/client/finance/Records/components/ModalForDetails'
import ModalForInvoice from '@/views/client/finance/Records/components/ModalForInvoice'

export default {
  name: 'Records',
  mixins: [dynamicState(store, dynamicModules)],
  data: () => ({}),
  methods: {},
  render() {
    return (
      <BNContainer
        moduleTitle="我的发票"
        class="bn-invoices-container"
      >
        <Table />
        <ModalForDetails />
        <ModalForInvoice />
      </BNContainer>
    )
  }
}
