import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import { Icon } from 'ant-design-vue'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import FormForFillInformation from './components/FormForFillInformation'
import FormForSelectBusiness from './components/FormForSelectBusiness'
import FormForResult from './components/FormForResult'
import FormForContract from './components/FormForContract'

export default {
  name: 'MyContracts-SigningProcess',
  mixins: [dynamicState(store, dynamicModules)],
  render() {
    return (
      <div class={'bnm-signing-process-container'}>
        <div class={'signing-process-navigation'}>
          <div class={'navigation-wrapper'}>
            <div class={'navigation-item checked'}>
              <Icon component={require('./assets/images/business.svg')} />
              <span>选择企业</span>
            </div>
            <div class={'navigation-item'}>
              <Icon component={require('./assets/images/info.svg')} />
              <span>填报签约信息</span>
            </div>
            <div class={'navigation-item'}>
              <Icon component={require('./assets/images/contract.svg')} />
              <span>合同签约</span>
            </div>
            <div class={'navigation-item'}>
              <Icon component={require('./assets/images/review.svg')} />
              <span>合同审核</span>
            </div>
          </div>
        </div>
        <BNContainer
          class={'signing-process-wrapper'}
          contentClass={'signing-process-content'}
          showBoxShadow={false}
        >
          <FormForContract/>
          {/*<FormForResult/>*/}
          {/*<FormForSelectBusiness />*/}
          {/*<FormForFillInformation />*/}
        </BNContainer>
      </div>
    )
  }
}
