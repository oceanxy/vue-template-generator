import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import { Button, Spin } from 'ant-design-vue'
import store, { dynamicModules } from '@/store/client'
import dynamicState from '@/mixins/dynamicState'
import { dispatch } from '@/utils/store'

export default {
  name: 'ReportForm',
  mixins: [dynamicState(store, dynamicModules)],
  computed: {
    loading() {
      return this.$store.state[this.moduleName].loading
    },
    list() {
      return this.$store.state[this.moduleName].list
    }
  },
  mounted() {
    dispatch(this.moduleName, 'getMyReportList')
  },
  methods: {
    toForm(item) {
      this.$router.push({ name: 'reportFForm', query: { id: item.id, name: item.fullName } })
    },
    toRecord() {
      this.$router.push({ name: 'reportFormRecord' })
    }
  },
  render() {
    return (
      <BNContainer width="100%" modalTitle="我的报表" contentClass="bn-report-content">
        <Spin spinning={this.loading}>
          {this.list.map(item => (
            <div class={`report-form ${item.isFill === 1 ? 'record' : null}`}>
              <div class="content">
                <div class="title">{item.fullName}</div>
                <div class="description">{item.description}</div>
                <div class="datetime">
                  填报时间：{item.startTimeStr}~{item.endTimeStr}
                </div>
              </div>
              <div class="btns">
                {item.isFill === 1 ? (
                  <Button class="record" style={{ '--antd-wave-shadow-color': '#13c2c2' }} onClick={this.toRecord}>
                    查看填报记录
                  </Button>
                ) : (
                  <Button type="primary" onClick={() => this.toForm(item)}>
                    立即填报
                  </Button>
                )}
              </div>
            </div>
          ))}
        </Spin>
      </BNContainer>
    )
  }
}
