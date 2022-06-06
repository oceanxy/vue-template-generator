import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import { Button } from 'ant-design-vue'

export default {
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
      <BNContainer
        width="100%"
        title="我的报表"
        contentClass="bn-report-content"
      >
        <div class="report-form">
          <div class="content">
            <div class="title">2021年度企业考核</div>
            <div class="description">描述说明</div>
            <div class="datetime">填报时间：2022-05-22 10:21~2022-05-22 10:21</div>
          </div>
          <div class="btns">
            <Button type="primary" onClick={this.toForm}>立即填报</Button>
          </div>
        </div>
        <div class="report-form record">
          <div class="content">
            <div class="title">2021年度企业考核</div>
            <div class="description">描述说明</div>
            <div class="datetime">填报时间：2022-05-22 10:21~2022-05-22 10:21</div>
          </div>
          <div class="btns">
            <Button
              class="record"
              style={{ '--antd-wave-shadow-color': '#13c2c2' }}
              onClick={this.toRecord}
            >
              查看填报记录
            </Button>
          </div>
        </div>
      </BNContainer>
    )
  }
}
