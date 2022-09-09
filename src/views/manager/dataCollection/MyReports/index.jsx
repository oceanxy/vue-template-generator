import './index.scss'
import { Button, Card, Empty, Space, Spin } from 'ant-design-vue'
import BNContainer from '@/components/BNContainer'
import dynamicState from '@/mixins/dynamicState'
import { mapState } from '@/utils/store'

export default {
  name: 'MyReports',
  mixins: [dynamicState()],
  computed: {...mapState(['list', 'loading'])},
  async created() {
    await this.$store.dispatch('getList', {moduleName: this.moduleName})
  },
  methods: {
    async fillOutNow(reportId, fillObj) {
      await this.$router.push({
        name: 'fillOutReport', query: {
          reportId, fillObj
        }
      })
    },
    async fillInRecord(reportId, fillObj) {
      await this.$router.push({
        name: 'fillInRecords', query: {
          reportId, fillObj
        }
      })
    }
  },
  render() {
    return (
      <div class={'bnm-my-reports-container'}>
        <BNContainer
          width={'100%'}
          modalTitle={'我的报表'}
          showBoxShadow={false}
        >
          <Spin spinning={this.loading}>
            <Space direction="vertical" style={{ width: '100%' }}>
              {
                this.list.length
                  ? this.list.map(item => (
                    <Card title={item.fullName}>
                      <div>{item.description}</div>
                      <div>填报时间：{item.startTimeStr} ~ {item.endTimeStr}</div>
                      <div class={'btn'}>
                        {
                          !item.isFill
                            ? (
                              <Button
                                type={'primary'}
                                onClick={() => this.fillOutNow(item.id, item.fillObj)}
                              >
                                立即填报
                              </Button>
                            )
                            : (
                              <Button
                                type={'primary'}
                                onClick={() => this.fillInRecord(item.id, item.fillObj)}
                              >
                                填报记录
                              </Button>
                            )
                        }
                      </div>
                    </Card>
                  ))
                  : <Empty />
              }
            </Space>
          </Spin>
        </BNContainer>
      </div>
    )
  }
}
