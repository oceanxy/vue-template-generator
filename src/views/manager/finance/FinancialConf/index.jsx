import './index.scss'
import dynamicState from '@/mixins/dynamicState'
import ServiceManagementFee from './components/ServiceManagementFee'
import SecurityDeposit from './components/SecurityDeposit'
import Rents from './components/Rents'
import ModalOfEdit from './components/ModalOfEdit'
// import Payables from './components/Payables'

export default {
  name: 'FinancialConf',
  mixins: [dynamicState()],
  render() {
    return (
      <div class={'bnm-financial-conf-container'}>
        <ServiceManagementFee />
        <SecurityDeposit />
        <Rents />

        {/*<Payables />*/}

        <ModalOfEdit modalTitle={'{action}房屋租金配置'} />
      </div>
    )
  }
}
