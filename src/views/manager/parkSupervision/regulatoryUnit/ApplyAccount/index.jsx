import './assets/styles/index.scss'
import TGContainerWithSider from '@/components/TGContainerWithSider'
import BNContainer from '@/components/BNContainer'
import TGListWithSubTitle from '@/components/TGListWithSubTitle'
import Form from '@/views/manager/parkSupervision/regulatoryUnit/ApplyAccount/components/Form'

export default {
  data() {
    return ({
      data: [
        {
          a: 1,
          b: 2,
          c: 3
        }
      ]
    })
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
            <p>园区行政监管部门将会审核您的账号申请，请耐心等待。</p>
            <p>审核通过后将可在园区账号管理功能中进行管理</p>
          </div>
          <div class={'apply-account-form-container'}>
            <Form class={'apply-account-form'} />
          </div>
        </template>
        <BNContainer
          slot={'sider'}
          showBoxShadow={false}
          width={'100%'}
          title={'账号申请记录'}
          contentClass={'apply-account-records-container'}
        >
          <TGListWithSubTitle type={'ring'} />
        </BNContainer>
      </TGContainerWithSider>
    )
  }
}
