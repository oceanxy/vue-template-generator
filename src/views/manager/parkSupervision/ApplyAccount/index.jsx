import './assets/styles/index.scss'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import BNContainer from '@/components/BNContainer'
import TGListWithSubTitle from '@/components/TGListWithSubTitle'
import Form from '@/views/manager/parkSupervision/ApplyAccount/components/Form'
import dynamicState from '@/mixins/dynamicState'
import { mapGetters } from 'vuex'
import { Spin } from 'ant-design-vue'

export default {
  mixins: [
    dynamicState({
      customModuleName: 'accountOpening',
      isRequestData: false
    })
  ],
  computed: {
    ...mapGetters({
      getState: 'getState',
      getLoading: 'getLoading'
    }),
    listOfAccountApplicationRecord() {
      return this.getState('listOfAccountApplicationRecord', 'accountOpening')
    }
  },
  async created() {
    await this.$store.dispatch('accountOpening/getListOfAccountApplicationRecord')
  },
  render() {
    return (
      <TGContainerWithSider
        class="bnm-apply-account-container"
        siderClass="apply-account-sider"
        contentClass={'apply-account-content'}
      >
        <template slot={'default'}>
          <div class={'apply-account-remind'}>
            <p>中心行政监管部门将会审核您的账号申请，请耐心等待。</p>
            <p>审核通过后将可在中心账号管理功能中进行管理</p>
          </div>
          <div class={'apply-account-form-container'}>
            <Form class={'apply-account-form'} />
          </div>
        </template>
        <BNContainer
          slot={'sider'}
          showBoxShadow={false}
          width={'100%'}
          modalTitle={'账号申请记录'}
          contentClass={'apply-account-records-container'}
        >
          <Spin spinning={this.getLoading('accountOpening')}>
            <TGListWithSubTitle
              type={'ring'}
              dataSource={this.listOfAccountApplicationRecord}
            />
          </Spin>
        </BNContainer>
      </TGContainerWithSider>
    )
  }
}
