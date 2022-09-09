import './assets/styles/index.scss'
import { Spin } from 'ant-design-vue'
import dynamicState from '@/mixins/dynamicState'
import BNContainer from '@/components/BNContainer'
import Navigation from './components/Navigation'
import { mapGetters } from 'vuex'

export default {
  name: 'SigningProcess',
  mixins: [dynamicState()],
  computed: {
    ...mapGetters({getState: 'getState'}),
    loading() {
      return this.getState('loading', this.moduleName)
    },
    details() {
      return this.getState('details', this.moduleName)
    }
  },
  async created() {
    if (this.$route.query.id) {
      // 存在未完成的签约流程，直接获取合同信息，接续签约
      await this.$store.dispatch('getDetails', {
        moduleName: this.moduleName,
        payload: {
          id: this.$route.query.id,
          signingType: this.$route.query.ac
        }
      })

      if (this.details.signingStage === 4 && +this.$route.query.ac === 1) {
        this.$store.commit('setDetails', {
          moduleName: this.moduleName,
          merge: true,
          value: {signingStage: 1}
        })
      }
    } else {
      // 未携带参数进入流程，则为新签约流程，重置合同信息
      this.$store.commit('setDetails', {
        moduleName: this.moduleName,
        value: {signingStage: 1}
      })
    }
  },
  methods: {
    recoverySteps() {
      let Component = {
        // 注：此处 render 函数必须使用箭头函数，因为作用域问题
        render: () => {
          if (this.loading) {
            return <Spin class={'signing-process-loading'}>正在加载签约流程，请稍等...</Spin>
          } else {
            return <Spin class={'signing-process-loading'} spinning={this.loading}>发生错误，加载签约流程失败！</Spin>
          }
        }
      }

      if (this.details.signingStage === 1) {
        Component = require('./components/FormForSelectCompany')
      } else if (this.details.signingStage === 2) {
        Component = require('./components/FormForFillInformation')
      } else if (this.details.signingStage === 3) {
        Component = require('./components/FormForContract')
      } else if (this.details.signingStage === 4) {
        Component = require('./components/FormForResult')
      }

      return Component?.default ?? Component
    }
  },
  render() {
    const Component = this.recoverySteps()

    return (
      <div class={'bnm-signing-process-container'}>
        <Navigation />
        <BNContainer
          class={'signing-process-wrapper'}
          contentClass={'signing-process-content'}
          showBoxShadow={false}
        >
          <Component />
        </BNContainer>
      </div>
    )
  }
}
