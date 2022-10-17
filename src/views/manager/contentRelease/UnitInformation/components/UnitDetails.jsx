import '../index.scss'
import { Alert, Button, Descriptions, Spin } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import forIndex from '@/mixins/forIndex'

export default {
  inject: ['moduleName'],
  mixins: [forIndex],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    unitDetails() {
      return this.getState('unitDetails', this.moduleName)
    }
  },
  async created() {
    await this.$store.dispatch('getListForSelect', {
      moduleName: this.moduleName,
      stateName: 'unitDetails',
      customApiName: 'getUnitDetails'
    })
  },
  render() {
    return (
      <Spin
        spinning={this.unitDetails.loading}
        class={'conf-item'}
      >
        <Descriptions
          bordered
          column={1}
          title={
            <div class={'conf-title unit'}>
              <div class={'title'}>
                <span>{this.unitDetails.data.unitName}</span>
                <Button
                  ghost
                  type={'primary'}
                  onClick={() => this._setVisibleOfModal({
                    ...this.unitDetails.data,
                    stateName: 'rents'
                  })}
                >
                  配置
                </Button>
              </div>
              {
                this.unitDetails.data.description ? <Alert message={this.unitDetails.data.description} /> : null
              }
            </div>
          }
        >
          <Descriptions.Item label={'法定代表人'}>{this.unitDetails.data.legalPerson}</Descriptions.Item>
          <Descriptions.Item label={'电话'}>{}</Descriptions.Item>
          <Descriptions.Item label={'邮箱'}>{}</Descriptions.Item>
          <Descriptions.Item label={'网址'}>{}</Descriptions.Item>
          <Descriptions.Item label={'地址'}>{this.unitDetails.data.address}</Descriptions.Item>
          <Descriptions.Item label={'简介'}>{this.unitDetails.data.description}</Descriptions.Item>
          <Descriptions.Item label={'统一社会信用代码'}>{this.unitDetails.data.uscc}</Descriptions.Item>
          <Descriptions.Item label={'纳税人识别号'}>{this.unitDetails.data.tin}</Descriptions.Item>
          <Descriptions.Item label={'组织机构代码'}>{this.unitDetails.data.oc}</Descriptions.Item>
          <Descriptions.Item label={'工商注册号'}>{this.unitDetails.data.icrn}</Descriptions.Item>
          <Descriptions.Item label={'负责人'}>{this.unitDetails.data.dutyPerson}</Descriptions.Item>
          <Descriptions.Item label={'负责人手机'}>{this.unitDetails.data.dutyPersonMobile}</Descriptions.Item>
        </Descriptions>
      </Spin>
    )
  }
}
