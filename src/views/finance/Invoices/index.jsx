import './index.scss'
import Table from '@/views/finance/Invoices/components/Table'
import dynamicState from '@/mixins/dynamicState'
import BNContainer from '@/components/BNContainer'

export default {
  name: 'Invoices',
  mixins: [dynamicState],
  data: () => ({}),
  methods: {},
  render() {
    return (
      <BNContainer
        title="我的发票"
        class="bn-records-container"
      >
        <Table />
      </BNContainer>
    )
  }
}
