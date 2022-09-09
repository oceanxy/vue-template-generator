import './assets/styles/index.scss'
import dynamicState from '@/mixins/dynamicState'
import { mapGetters } from 'vuex'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import BNContainer from '@/components/BNContainer'
import Form from './components/Form'
import Records from './components/Records'

export default {
  mixins: [
    dynamicState({
      customModuleName: 'assignComplaints',
      isRequestData: false
    })
  ],
  provide() {
    return { moduleName: 'assignComplaints' }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    complaintRecords() {
      return this.getState('complaintRecords', 'assignComplaints')
    }
  },
  async created() {
    await this.$store.dispatch('getListForSelect', {
      moduleName: 'assignComplaints',
      stateName: 'complaintRecords',
      customApiName: 'getRecordsOfComplaint'
    })
  },
  render() {
    return (
      <TGContainerWithSider
        class="bnm-complaint-registration-container"
        siderClass="complaint-registration-sider"
        contentClass={'complaint-registration-content'}
      >
        <template slot={'default'}>
          <div class={'remind'}>
            <p>请如实填写投诉的内容！</p>
            <p>投诉登记成功后我们会尽快处理，请耐心等待。</p>
          </div>
          <div class={'form-container'}>
            <Form class={'form'} />
          </div>
        </template>
        <BNContainer
          slot={'sider'}
          showBoxShadow={false}
          width={'100%'}
          modalTitle={`投诉登记记录（${this.complaintRecords.list.length || 0}）`}
          contentClass={'records-container'}
        >
          <Records />
        </BNContainer>
      </TGContainerWithSider>
    )
  }
}
