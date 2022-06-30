import './index.scss'
import { Descriptions, Tabs } from 'ant-design-vue'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'
import TGTabPane from '@/components/TGTabPane'
import BillTable from '../components/ModalOfBills/components/Table'

export default {
  name: 'BusinessDetails',
  mixins: [dynamicState(store, dynamicModules)],
  props: {
    contentClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false
    }
  },
  mounted() {
    const { id } = this.$route.query

    this.$store.dispatch('getDetails', {
      moduleName: this.moduleName,
      additionalQueryParameters: { id }
    })
  },
  render() {
    return (
      <Tabs slot="default" class="bnm-businesses-details-content">
        <TGTabPane name="账号信息" tabKey={1}>
          <Descriptions column={1} colon={false}>
            <Descriptions.Item label={'登录账号'}>2432523535</Descriptions.Item>
            <Descriptions.Item label={'注册时间'}>2432523535</Descriptions.Item>
            <Descriptions.Item label={'注册IP'}>2432523535</Descriptions.Item>
            <Descriptions.Item label={'最近登录'}>2432523535</Descriptions.Item>
            <Descriptions.Item label={'登录IP'}>2432523535</Descriptions.Item>
          </Descriptions>
        </TGTabPane>
        <TGTabPane name="账单信息" tabKey={2}>
          <BillTable />
        </TGTabPane>
        <TGTabPane name="缴费记录" tabKey={3}>
          <BillTable />
        </TGTabPane>
        <TGTabPane name="投诉建议" tabKey={4}>
          <BillTable />
        </TGTabPane>
      </Tabs>
    )
  }
}
