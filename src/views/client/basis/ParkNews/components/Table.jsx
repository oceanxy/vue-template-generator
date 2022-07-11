import '../assets/css/index.scss'
import { Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '标题',
            dataIndex: 'articleTitle',
            scopedSlots: { customRender: 'articleTitle' }
          },
          {
            title: '园区名称',
            dataIndex: 'parkName'
          },
          {
            title: '部门名称',
            dataIndex: 'organName'
          },
          {
            title: '作者',
            dataIndex: 'author'
          },
          {
            title: '发布时间',
            dataIndex: 'publishTimeStr'
          }
        ],
        rowSelection: null
      }
    }
  },
  methods: {
    toDetail(data) {
      this.$router.push({
        name: 'parkNewsDetail',
        query: {
          id: data.articleId
        }
      })
    }
  },
  render() {
    return (
      <Table
        ref={`${this.moduleName}Table`}
        loading={this.getLoading(this.moduleName)}
        {...{ props: this.tableProps }}
        {...{
          scopedSlots: {
            articleTitle: (text, record) => {
              return <a onclick={() => this.toDetail(record)}>{record.articleTitle}</a>
            }
            // status: (text, record) => (
            //   <Switch
            //     checked={+record.status === 1}
            //     onChange={checked => this.onStatusChange(checked, record)}
            //   />
            // ),
          }
        }}
      />
    )
  }
}
