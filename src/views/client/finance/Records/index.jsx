import './assets/styles/index.scss'
import Table from '@/views/client/finance/Records/components/Table'
import dynamicState from '@/mixins/dynamicState'
import BNContainer from '@/components/BNContainer'
import ModalForDetails from '@/views/client/finance/Records/components/ModalForDetails'
import ModalForInvoice from '@/views/client/finance/Records/components/ModalForInvoice'

export default {
  name: 'Records',
  mixins: [dynamicState],
  data: () => ({}),
  methods: {},
  render() {
    return (
      <BNContainer
        title="我的发票"
        class="bn-invoices-container"
      >
        <Table />
        <ModalForDetails />
        <ModalForInvoice />
      </BNContainer>
    )
  }
}
