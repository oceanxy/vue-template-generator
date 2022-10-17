import '../index.scss'
import { Alert, Descriptions, Spin, Switch } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    remind: {
      get() {
        return this.getState('remind', this.moduleName)
      },
      async set(value) {
        await this.$store.commit('setDetails', '')
      }
    }
  },
  async created() {
    // await this.$store.dispatch('getListForSelect', {
    //   moduleName: this.moduleName,
    //   stateName: 'remind',
    //   customApiName: ''
    // })
  },
  render() {
    return (
      <Spin
        spinning={this.remind.loading}
        class={'conf-item'}
      >
        <Descriptions
          bordered
          column={1}
          title={
            <div class={'conf-title subtitle'}>
              <div class={'title'}>派单提醒</div>
              <Alert message={'派单后向受理员工发送提醒短信'} />
            </div>
          }
        >
          <Descriptions.Item label={'启用状态'}>
            {/*<Switch vModel={this.remind.data} />*/}
            <Switch />
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    )
  }
}
