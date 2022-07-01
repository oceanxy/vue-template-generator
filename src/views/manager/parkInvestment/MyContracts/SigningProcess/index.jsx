import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import FormForContract from './components/FormForContract'
import Navigation from './components/Navigation'
import FormForSelectCompany from './components/FormForSelectCompany'

export default {
  name: 'SigningProcess',
  mixins: [dynamicState(store, dynamicModules)],
  created() {
    this.$store.dispatch('setCurrentItem', {
      moduleName: this.moduleName,
      value: {
        step: 1 // 当前步骤，共四步
      }
    })
  },
  render() {
    return (
      <div class={'bnm-signing-process-container'}>
        <Navigation />
        <BNContainer
          class={'signing-process-wrapper'}
          contentClass={'signing-process-content'}
          showBoxShadow={false}
        >
          <FormForSelectCompany />
          {/*<FormForContract />*/}
          {/*<FormForResult/>*/}
          {/*<FormForFillInformation />*/}
        </BNContainer>
      </div>
    )
  }
}
