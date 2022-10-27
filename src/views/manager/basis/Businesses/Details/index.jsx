import './index.scss'
import { Card, Descriptions, Empty, Tabs } from 'ant-design-vue'
import dynamicState from '@/mixins/dynamicState'
import TGTabPane from '@/components/TGTabPane'
import BillTable from '../components/ModalOfBills/components/Table'
import PaymentRecordsTable from '../components/ModalOfPaymentRecords/components/Table'
import SuggestionsTable from '../components/ModalOfSuggestions/components/Table'
import { mapGetters } from 'vuex'

export default {
  name: 'Businesses-BusinessDetails',
  mixins: [
    // 为 table 统一注册 businesses 模块
    dynamicState(),
    // 注册 businessDetails 模块
    dynamicState({
      customModuleName: 'businessDetails',
      isRequestData: false
    })
  ],
  props: {
    contentClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    list() {
      return this.getState('list', 'businessDetails')
    },
    loading() {
      return this.getState('loading', 'businessDetails')
    }
  },
  async created() {
    const { cid, bid } = this.$route.query
    const id = cid ?? bid

    await this.$store.dispatch('getList', {
      moduleName: 'businessDetails',
      additionalQueryParameters: { id }
    })
  },
  render() {
    return (
      <Tabs
        slot="default"
        class="tg-businesses-details-content"
      >
        <TGTabPane
          name="账号信息"
          tabKey={1}
          icon={''}
        >
          {
            this.list.length || this.loading
              ? (
                <div class={'tg-businesses-details-cards'}>
                  {
                    this.list.map(item => (
                      <Card
                        loading={this.loading}
                        title={'昵称：' + item.nickName}
                      >
                        <Descriptions
                          column={1}
                          colon={false}
                        >
                          <Descriptions.Item label={'登录账号'}>{item.loginAccount}</Descriptions.Item>
                          <Descriptions.Item label={'注册时间'}>{item.createTimeStr}</Descriptions.Item>
                          <Descriptions.Item label={'注册IP'}>{item.registerIp}</Descriptions.Item>
                          <Descriptions.Item label={'最近登录'}>{item.lastLoginTimeStr}</Descriptions.Item>
                          <Descriptions.Item label={'登录IP'}>{item.lastLoginIp}</Descriptions.Item>
                        </Descriptions>
                      </Card>
                    ))
                  }
                </div>
              )
              : <Empty class={'empty'} />
          }
        </TGTabPane>
        <TGTabPane
          name="账单信息"
          tabKey={2}
          icon={''}
        >
          <BillTable />
        </TGTabPane>
        <TGTabPane
          name="缴费记录"
          tabKey={3}
          icon={''}
        >
          <PaymentRecordsTable />
        </TGTabPane>
        <TGTabPane
          name="投诉建议"
          tabKey={4}
          icon={''}
        >
          <SuggestionsTable />
        </TGTabPane>
      </Tabs>
    )
  }
}
