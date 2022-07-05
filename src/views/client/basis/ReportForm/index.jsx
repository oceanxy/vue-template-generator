import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import { Button } from 'ant-design-vue'
import store, { dynamicModules } from '@/store/client'
import dynamicState from '@/mixins/dynamicState'

export default {
  name: 'ReportForm',
  mixins: [dynamicState(store, dynamicModules)],
  methods: {
    toForm() {
      this.$router.push({ name: 'reportFForm' })
    },
    toRecord() {
      this.$router.push({ name: 'reportFormRecord' })
    }
  },
  render() {
    return (
      <BNContainer width="100%" moduleTitle="我的报表" contentClass="bn-report-content">
        <div class="report-form">
          <div class="content">
            <div class="title">2021年度企业考核</div>
            <div class="description">
              为了进一步推动创新中心技术建设，规范创新中心机制和运作体系，监督强化中心各项工作
            </div>
            <div class="datetime">填报时间：2022-05-22 10:21~2022-05-22 10:21</div>
          </div>
          <div class="btns">
            <Button type="primary" onClick={this.toForm}>
              立即填报
            </Button>
          </div>
        </div>
        <div class="report-form record">
          <div class="content">
            <div class="title">2020年度企业考核</div>
            <div class="description">
              为了进一步推动创新中心技术建设，规范创新中心机制和运作体系，监督强化中心各项工作
            </div>
            <div class="datetime">填报时间：2021-06-05 10:21~2021-06-06 12:11</div>
          </div>
          <div class="btns">
            <Button class="record" style={{ '--antd-wave-shadow-color': '#13c2c2' }} onClick={this.toRecord}>
              查看填报记录
            </Button>
          </div>
        </div>
        <div class="report-form record">
          <div class="content">
            <div class="title">2019年度企业考核</div>
            <div class="description">
              为了进一步推动创新中心技术建设，规范创新中心机制和运作体系，监督强化中心各项工作
            </div>
            <div class="datetime">填报时间：2020-06-22 10:21~2022-06-22 10:21</div>
          </div>
          <div class="btns">
            <Button class="record" style={{ '--antd-wave-shadow-color': '#13c2c2' }} onClick={this.toRecord}>
              查看填报记录
            </Button>
          </div>
        </div>
        <div class="report-form record">
          <div class="content">
            <div class="title">2018年度企业考核</div>
            <div class="description">
              为了进一步推动创新中心技术建设，规范创新中心机制和运作体系，监督强化中心各项工作
            </div>
            <div class="datetime">填报时间：2019-05-21 10:21~2019-05-21 10:21</div>
          </div>
          <div class="btns">
            <Button class="record" style={{ '--antd-wave-shadow-color': '#13c2c2' }} onClick={this.toRecord}>
              查看填报记录
            </Button>
          </div>
        </div>
      </BNContainer>
    )
  }
}
