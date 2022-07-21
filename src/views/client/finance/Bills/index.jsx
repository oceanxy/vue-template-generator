import './assets/styles/index.scss'
import { Tabs, Spin } from 'ant-design-vue'
import BillsTabPane from '@/views/client/finance/Bills/components/BillsTabPane'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/client'
import { dispatch } from '@/utils/store'

export default {
  name: 'Bills',
  mixins: [dynamicState(store, dynamicModules)],
  data: () => ({
    activeKey: '1'
  }),
  computed: {
    loading() {
      return this.$store.state[this.moduleName].loading
    },
    details() {
      return this.$store.state[this.moduleName].details
    },
    //欠费账单
    oweList() {
      const list = this.details?.oweList || []

      return list
    },
    //已结清账单
    clearList() {
      const list = this.details?.clearList || []

      return list
    }
  },
  mounted() {
    dispatch(this.moduleName, 'getUserCompanyBillList')
  },
  methods: {
    callback(key) {
      this.activeKey = key
    }
  },
  render() {
    return (
      <div class="bn-bills-container">
        <Spin spinning={this.loading}>
          {this.details.isOwe === 1 ? (
            <div class="summary">
              <span class="label">累积欠缴金额：</span>
              <span class="sum">￥{this.details.amount}</span>
              <span class="amount">{this.details.oweAmountDesc}</span>
              {/* <Button class="btn" type="primary">
                全部结清
              </Button> */}
            </div>
          ) : (
            <div class="summary">
              <span class="label">{this.details.billDescription}</span>
            </div>
          )}
          <Tabs activeKey={this.activeKey} onChange={this.callback} class="bills-tabs">
            <Tabs.TabPane key="1" tab="欠缴账单">
              <BillsTabPane activeKey={this.activeKey} data={this.oweList} />
            </Tabs.TabPane>
            <Tabs.TabPane key="2" tab="已结清账单">
              <BillsTabPane activeKey={this.activeKey} data={this.clearList} />
            </Tabs.TabPane>
          </Tabs>
        </Spin>
      </div>
    )
  }
}
