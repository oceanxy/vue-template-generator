import '../index.scss'
import { Button, Descriptions, Spin } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    payables() {
      return this.getState('payables', this.moduleName)
    }
  },
  async created() {
    await this.$store.dispatch('getListForSelect', {
      moduleName: this.moduleName,
      stateName: 'payables',
      customApiName: 'getPayables'
    })
  },
  render() {
    return (
      <Spin
        spinning={this.payables.loading}
        class={'financial-conf-item'}
        style={{ gridColumn: 'span 2' }}
      >
        <Descriptions
          bordered
          column={3}
          title={
            <div class={'financial-conf-title'}>
              <span>应付款项配置</span>
              <Button
                ghost
                type={'primary'}
              >配置</Button>
            </div>
          }
        >
          {
            this.payables.list.map(item => [
              <Descriptions.Item label={'费项名称'}>{item.itemName}</Descriptions.Item>,
              <Descriptions.Item label={'状态'}>{item.statusStr}</Descriptions.Item>,
              <Descriptions.Item label={'费项描述'}>{item.description}</Descriptions.Item>
            ])
          }
        </Descriptions>
      </Spin>
    )
  }
}
