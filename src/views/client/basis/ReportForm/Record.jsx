import './assets/styles/index.scss'
import BNContainer from '@/components/BNContainer'
import { Button, Table, Spin } from 'ant-design-vue'
import store, { dynamicModules } from '@/store/client'
import dynamicState from '@/mixins/dynamicState'
import { mapAction, mapState } from '@/utils/store'
import moment from 'moment'
export default {
  name: 'ReportRecordForm',
  mixins: [dynamicState(store, dynamicModules)],
  data() {
    return {
      tableProps: {
        pagination: false,
        columns: [
          {
            title: '序号',
            width: 60,
            scopedSlots: { customRender: 'sortIndex' }
          },
          {
            title: '标题',
            dataIndex: 'itemName'
          },
          {
            title: '内容',
            scopedSlots: { customRender: 'content' }
          },
          {
            title: '佐证材料',
            scopedSlots: { customRender: 'attachment' }
          }
        ]
      }
    }
  },
  computed: {
    ...mapState(['loading', 'list'])
  },
  mounted() {
    const { id, name } = this.$route.query
    this.reportInfo = {
      id,
      name
    }
    this.getReportRecord({ reportId: id })
  },
  methods: {
    toForm() {
      this.$router.push({ name: 'reportFForm', query: { id: this.reportInfo.id, name: this.reportInfo.name } })
    },
    ...mapAction(['getReportRecord'])
  },
  render() {
    const getContent = item => {
      if (item.modType === 4) {
        return <span>{moment().format(item.resultContent, 'YYYY-MM-DD')}</span>
      } else if (item.modType === 5) {
        const url = item.resultFile?.path || ''
        return url ? <img src={url} class="img"></img> : ''
      } else if (item.modType === 6) {
        const resultFile = item.resultFile
        return (
          <a href={resultFile?.path || ''} target="_brank">
            {resultFile?.fileName || ''}
          </a>
        )
      } else {
        return <span>{item.resultContent}</span>
      }
    }
    const getAttachment = item => {
      if (!item.attachmentList || item.attachmentList.length === 0) return <span>无</span>
      return item.attachmentList.map(item => (
        <div>
          <a href={item.path} target="_brank">
            {item.fileName}
          </a>
        </div>
      ))
    }
    return (
      <BNContainer width="100%" class="bn-report-record-content" modalTitle={`我的报表 > ${this.$route.query.name}`}>
        <Spin spinning={this.loading}>
          <Table
            class="bn-report-record-table"
            data-source={this.list}
            {...{ props: this.tableProps }}
            scopedSlots={{
              sortIndex: (text, record, index) => <span>{index + 1}</span>,
              content: (text, record) => getContent(record),
              attachment: record => {
                return getAttachment(record)
              }
            }}
          />
        </Spin>
        <div class="btns">
          <Button type="primary" onClick={this.toForm}>
            重新填报
          </Button>
        </div>
      </BNContainer>
    )
  }
}
