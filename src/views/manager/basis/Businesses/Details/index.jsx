import './index.scss'
import { Descriptions, Tabs } from 'ant-design-vue'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import BNContainer from '@/components/BNContainer'
import TGTabPane from '@/components/TGTabPane'
import BillTable from '@/views/manager/basis/Businesses/components/BillTable'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/manager'

export default {
  name: 'Businesses-BusinessDetails',
  mixins: [dynamicState(store, dynamicModules)],
  props: {
    contentClass: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      loading: false,
      data: [
        {
          title: '0-0',
          key: '0-0',
          children: [
            {
              title: '0-0-0',
              key: '0-0-0',
              children: [
                { title: '0-0-0-0', key: '0-0-0-0' },
                { title: '0-0-0-1', key: '0-0-0-1' },
                { title: '0-0-0-2', key: '0-0-0-2' }
              ]
            },
            {
              title: '0-0-1',
              key: '0-0-1',
              children: [
                { title: '0-0-1-0', key: '0-0-1-0' },
                { title: '0-0-1-1', key: '0-0-1-1' },
                { title: '0-0-1-2', key: '0-0-1-2' }
              ]
            },
            {
              title: '0-0-2',
              key: '0-0-2'
            }
          ]
        },
        {
          title: '0-1',
          key: '0-1',
          children: [
            { title: '0-1-0-0', key: '0-1-0-0' },
            { title: '0-1-0-1', key: '0-1-0-1' },
            { title: '0-1-0-2', key: '0-1-0-2' }
          ]
        },
        {
          title: '0-2',
          key: '0-2'
        }
      ]
    }
  },
  render() {
    return (
      <TGContainerWithSider
        class="bnm-businesses-details-container"
        siderClass="bnm-businesses-details-sider-container"
        contentClass="bnm-businesses-details-content-container"
        siderOnLeft={true}
      >
        <div slot="sider" class="bnm-businesses-details-sider">
          <BNContainer
            width="100%"
            showBoxShadow={false}
            title="企业信息"
          >
            <Descriptions column={1} colon={false}>
              <Descriptions.Item label={'企业名称'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'组织机构代码'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'所在行业'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'主营业务'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'营业执照'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'法人姓名'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'身份证号码'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'身份证照片'}>2432523535</Descriptions.Item>
            </Descriptions>
          </BNContainer>
          <BNContainer
            width="100%"
            title="签约信息"
            showBoxShadow={false}
          >
            <Descriptions column={1} colon={false}>
              <Descriptions.Item label={'租用场所'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'费用'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'优惠'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'签约团队'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'签约人员'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'线索采集'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'线索跟进'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'签约时间'}>2432523535</Descriptions.Item>
            </Descriptions>
          </BNContainer>
          <BNContainer
            width="100%"
            title="合同信息"
            showBoxShadow={false}
          >
            <Descriptions column={1} colon={false}>
              <Descriptions.Item label={'合同编号'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'合同名称'}>2432523535</Descriptions.Item>
              <Descriptions.Item label={'合同状态'}>2432523535</Descriptions.Item>
            </Descriptions>
          </BNContainer>
        </div>
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
      </TGContainerWithSider>
    )
  }
}

