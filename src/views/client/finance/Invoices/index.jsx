import './index.scss'
import Table from '@/views/client/finance/Invoices/components/Table'
import BNContainer from '@/components/BNContainer'
import store, { dynamicModules } from '@/store/client'
import dynamicState from '@/mixins/dynamicState'

export default {
  name: 'Invoices',
  mixins: [dynamicState(store, dynamicModules)],
  data: () => ({}),
  methods: {},
  render() {
    return (
      <BNContainer modalTitle="我的发票" class="bn-records-container">
        <Table />
      </BNContainer>
    )
  }
}
