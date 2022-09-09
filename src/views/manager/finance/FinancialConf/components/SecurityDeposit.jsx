import '../index.scss'
import { Button, Descriptions, Spin } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import forIndex from '@/mixins/forIndex'

export default {
  inject: ['moduleName'],
  mixins: [forIndex],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    securityDeposit() {
      return this.getState('securityDeposit', this.moduleName)
    }
  },
  async created() {
    await this.$store.dispatch('getListForSelect', {
      moduleName: this.moduleName,
      stateName: 'securityDeposit',
      customApiName: 'getSecurityDeposit'
    })
  },
  render() {
    return (
      <Spin
        spinning={this.securityDeposit.loading}
        class={'financial-conf-item'}
      >
        <Descriptions
          bordered
          column={1}
          title={
            <div class={'financial-conf-title'}>
              <span>{this.securityDeposit.data.itemName}</span>
              <Button
                ghost
                type={'primary'}
                onClick={() => this._setVisibleOfModal({
                  ...this.securityDeposit.data,
                  stateName: 'securityDeposit'
                })}
              >
                配置
              </Button>
            </div>
          }
        >
          <Descriptions.Item label={'金额'}>{this.securityDeposit.data.amountStr}</Descriptions.Item>
          <Descriptions.Item label={'计费单位'}>{this.securityDeposit.data.chargeUnit}</Descriptions.Item>
          <Descriptions.Item label={'描述'}>{this.securityDeposit.data.description}</Descriptions.Item>
          <Descriptions.Item label={'默认价格'}>{this.securityDeposit.data.monthMultipleStr}</Descriptions.Item>
          <Descriptions.Item label={'费项缴纳日期'}>{this.securityDeposit.data.payDayStr}</Descriptions.Item>
        </Descriptions>
      </Spin>
    )
  }
}
