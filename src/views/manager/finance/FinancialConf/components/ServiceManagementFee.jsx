import '../index.scss'
import { Button, Descriptions, Spin } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import forIndex from '@/mixins/forIndex'

export default {
  inject: ['moduleName'],
  mixins: [forIndex],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    serviceManagementFee() {
      return this.getState('serviceManagementFee', this.moduleName)
    }
  },
  async created() {
    await this.$store.dispatch('getListForSelect', {
      moduleName: this.moduleName,
      stateName: 'serviceManagementFee',
      customApiName: 'getServiceManagementFee'
    })
  },
  render() {
    return (
      <Spin
        spinning={this.serviceManagementFee.loading}
        class={'financial-conf-item'}
      >
        <Descriptions
          bordered
          column={1}
          title={
            <div class={'financial-conf-title'}>
              <span>{this.serviceManagementFee.data.itemName}</span>
              <Button
                ghost
                type={'primary'}
                onClick={() => this._setVisibleOfModal({
                  ...this.serviceManagementFee.data,
                  stateName: 'serviceManagementFee'
                })}
              >
                配置
              </Button>
            </div>
          }
        >
          <Descriptions.Item label={'金额'}>{this.serviceManagementFee.data.amountStr}</Descriptions.Item>
          <Descriptions.Item label={'费项描述'}>{this.serviceManagementFee.data.description}</Descriptions.Item>
          <Descriptions.Item label={'到期欠费是否使用履约保证金抵扣'}>
            {
              this.serviceManagementFee.data.isDeduction
                ? '是'
                : '否'
            }
          </Descriptions.Item>
          <Descriptions.Item label={'收取方式'}>{this.serviceManagementFee.data.takeTypeStr}</Descriptions.Item>
        </Descriptions>
      </Spin>
    )
  }
}
