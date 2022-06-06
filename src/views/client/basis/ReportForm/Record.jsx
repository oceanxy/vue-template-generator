import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import { Button, Table } from 'ant-design-vue'

export default {
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            dataIndex: 'pageName'
          },
          {
            title: '标题',
            dataIndex: 'appName'
          },
          {
            title: '内容',
            width: '20%',
            scopedSlots: { customRender: 'pagePathList' }
          },
          {
            title: '佐证材料',
            align: 'center',
            scopedSlots: { customRender: 'isMonitor' }
          }
        ]
      }
    }
  },
  methods: {
    toForm() {
      this.$router.push({ name: 'reportFForm' })
    }
  },
  render() {
    return (
      <BNContainer
        width="100%"
        title="我的报表 > 2021年度企业考核"
        contentClass="bn-report-record-content"
      >
        <Table
          {...{ props: this.tableProps }}
        />
        <div class="btns">
          <Button type="primary" onClick={this.toForm}>重新填报</Button>
        </div>
      </BNContainer>
    )
  }
}
