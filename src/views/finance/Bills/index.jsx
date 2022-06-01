import './assets/styles/index.scss'
import { Button, Tabs } from 'ant-design-vue'
import BillsTabPane from '@/views/finance/Bills/components/BillsTabPane'
import dynamicState from '@/mixins/dynamicState'

export default {
  name: 'Bills',
  mixins: [dynamicState],
  data: () => ({
    activeKey: '1'
  }),
  methods: {
    callback() {
      //
    }
  },
  render() {
    return (
      <div class="bn-bills-container">
        <div class="summary">
          <span class="label">累积欠缴金额：</span>
          <span class="sum">￥28392.00</span>
          <span class="amount">（共5个欠缴账单）</span>
          <Button class="btn" type="primary">全部结清</Button>
        </div>
        <Tabs
          activeKey={this.activeKey}
          onChange={this.callback}
          class="bills-tabs"
        >
          <Tabs.TabPane key='1' tab="欠缴账单">
            <BillsTabPane activeKey={this.activeKey} />
          </Tabs.TabPane>
          <Tabs.TabPane key='2' tab="已结清账单">
            <BillsTabPane activeKey={this.activeKey} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    )
  }
}
