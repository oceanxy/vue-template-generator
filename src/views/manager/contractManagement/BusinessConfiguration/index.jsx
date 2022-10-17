import './index.scss'
import { Spin } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import dynamicState from '@/mixins/dynamicState'
import BNMDescriptions from './components/BNMDescriptions'

export default {
  name: 'BusinessConfiguration',
  mixins: [dynamicState()],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    loading() {
      return this.getState('loading', this.moduleName)
    },
    details() {
      return this.getState('details', this.moduleName)
    }
  },
  async created() {
    await this.$store.dispatch('getDetails', { moduleName: this.moduleName })
  },
  render() {
    return (
      <Spin spinning={this.loading}>
        <div class={'bnm-business-configuration-container'}>
          <BNMDescriptions
            modalTitle={'合同到期提醒设置'}
            showButton
            dataSource={this.details}
          />
          {/*<BNMDescriptions modalTitle={'线索分配机制'} showButton />*/}
          {/*<BNMDescriptions modalTitle={'签约模板配置'} showButton />*/}
          {/*<BNMDescriptions modalTitle={'合同模板编辑'} showButton />*/}
          {/*<BNMDescriptions modalTitle={'企业考核指标'} showButton />*/}
        </div>
      </Spin>
    )
  }
}
