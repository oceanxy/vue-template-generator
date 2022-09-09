import './assets/styles/index.scss'
import { Button, Tabs } from 'ant-design-vue'
import BillsTabPane from '@/views/client/finance/Bills/components/BillsTabPane'
import dynamicState from '@/mixins/dynamicState'
import { mapGetters } from 'vuex'
import ModalOfPayFees from '@/views/client/finance/Bills/components/ModalOfPayFees'
import Message from '@/utils/message'

export default {
  name: 'Bills',
  mixins: [dynamicState()],
  data: () => ({ activeKey: 1 }),
  computed: {
    ...mapGetters({ getState: 'getState' }),
    details() {
      return this.getState('details', this.moduleName)
    },
    // 欠缴清单
    oweList() {
      return this.details?.oweList || []
    },
    // 已结清账单
    clearList() {
      return this.details?.clearList || []
    },
    companyId() {
      return this.getState('userInfo', 'login').companyId
    },
    selectedRowKeys() {
      return this.getState('selectedRowKeys', this.moduleName)
    },
    selectedRows() {
      return this.getState('selectedRows', this.moduleName)
    }
  },
  async created() {
    await this.$store.dispatch('getDetails', {
      moduleName: this.moduleName,
      payload: { companyId: this.companyId }
    })
  },
  methods: {
    async onPay() {
      await Message.verifySelected(this.selectedRowKeys, async () => {
        await this._setVisibleOfModal({
          billIds: this.selectedRowKeys,
          amount: this.selectedRows.reduce((prev, item) => {
            prev += item.amount

            return prev
          }, 0)
        }, 'visibleOfPayFees')
      })
    }
  },
  render() {
    return (
      <div class="bn-bills-container">
        <div class="summary">
          {
            this.details.isOwe === 1
              ? [
                <span class="label">累积欠缴金额：</span>,
                <span class="sum">￥{this.details.amount}</span>,
                <span class="amount">{this.details.oweAmountDesc}</span>,
                <Button
                  class="btn"
                  type="primary"
                  disabled={!this.selectedRowKeys.length}
                  onClick={() => this.onPay()}
                >
                  批量结清
                </Button>
              ]
              : <span class="label">{this.details.billDescription}</span>
          }
        </div>
        <Tabs
          vModel={this.activeKey}
          class="bills-tabs"
        >
          <Tabs.TabPane key={1} tab="欠缴账单">
            <BillsTabPane dataSource={this.oweList} />
          </Tabs.TabPane>
          <Tabs.TabPane key={2} tab="已结清账单">
            <BillsTabPane dataSource={this.clearList} />
          </Tabs.TabPane>
        </Tabs>
        <ModalOfPayFees modalTitle={'缴费'} />
      </div>
    )
  }
}
