import '../index.scss'
import { Alert, Button, Descriptions, Spin } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import forIndex from '@/mixins/forIndex'

export default {
  inject: ['moduleName'],
  mixins: [forIndex],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    remind: {
      get() {
        return this.getState('remind', this.moduleName)
      },
      async set() {
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
              <div class={'title'}>
                自动派单规则
                <Button
                  ghost
                  type={'primary'}
                  onClick={() => this._setVisibleOfModal({}, 'visibleOfAutoDispatchRules')}
                >
                  配置
                </Button>
              </div>
              <Alert message={'可开启是否由系统自动派单并设定派单规则'} />
            </div>
          }
        >
          <Descriptions.Item label={'启用状态'}>
            已开启（优先分配给当前受理量少的人员）
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    )
  }
}
