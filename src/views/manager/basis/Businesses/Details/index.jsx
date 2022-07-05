import './index.scss'
import { Descriptions, Tabs } from 'ant-design-vue'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import TGTabPane from '@/components/TGTabPane'
import BillTable from '../components/ModalOfBills/components/Table'
import PaymentRecordsTable from '../components/ModalOfPaymentRecords/components/Table'
import SuggestionsTable from '../components/ModalOfSuggestions/components/Table'
import { mapGetters } from 'vuex'

export default {
  name: 'Businesses-BusinessDetails',
  mixins: [
    // 为 table 统一注册 businesses 模块
    dynamicState(store, dynamicModules),
    // 注册 businessDetails 模块
    dynamicState(store, dynamicModules, 'businessDetails', false)
  ],
  props: {
    contentClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    details() {
      return this.getState('details', 'businessDetails')
    }
  },
  async created() {
    const { cid, bid } = this.$route.query
    const id = cid ?? bid

    await this.$store.dispatch('getDetails', {
      moduleName: 'businessDetails',
      payload: { id }
    })
  },
  render() {
    return (
      <Tabs slot="default" class="bnm-businesses-details-content">
        <TGTabPane name="账号信息" tabKey={1} icon={''}>
          <Descriptions column={1} colon={false}>
            <Descriptions.Item label={'登录账号'}>{this.details.loginAccount}</Descriptions.Item>
            <Descriptions.Item label={'注册时间'}>{this.details.createTimeStr}</Descriptions.Item>
            <Descriptions.Item label={'注册IP'}>{this.details.registerIp}</Descriptions.Item>
            <Descriptions.Item label={'最近登录'}>{this.details.lastLoginTimeStr}</Descriptions.Item>
            <Descriptions.Item label={'登录IP'}>{this.details.lastLoginIp}</Descriptions.Item>
          </Descriptions>
        </TGTabPane>
        <TGTabPane name="账单信息" tabKey={2} icon={''}>
          <BillTable />
        </TGTabPane>
        <TGTabPane name="缴费记录" tabKey={3} icon={''}>
          <PaymentRecordsTable />
        </TGTabPane>
        <TGTabPane name="投诉建议" tabKey={4} icon={''}>
          <SuggestionsTable />
        </TGTabPane>
      </Tabs>
    )
  }
}
