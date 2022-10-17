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
              <div class={'title'}>
                投诉处理提醒
                <Button
                  ghost
                  type={'primary'}
                  onClick={() => this._setVisibleOfModal({}, 'visibleOfRemindersForHandingComplaints')}
                >
                  配置
                </Button>
              </div>
              <Alert message={'投诉处理完毕后向指定管理员发送提醒短信'} />
            </div>
          }
        >
          <Descriptions.Item label={'启用状态'}>
            已关闭（提醒对象：-）
          </Descriptions.Item>
        </Descriptions>
      </Spin>
    )
  }
}
