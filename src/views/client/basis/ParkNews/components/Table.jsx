import '../assets/css/index.scss'
import { Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        rowKey: 'articleId',
        columns: [
          {
            title: '标题',
            dataIndex: 'articleTitle',
            scopedSlots: { customRender: 'articleTitle' }
          },
          {
            title: '园区名称',
            width: 150,
            dataIndex: 'parkName'
          },
          {
            title: '部门名称',
            width: 150,
            dataIndex: 'organName'
          },
          {
            title: '作者',
            width: 150,
            dataIndex: 'author'
          },
          {
            title: '发布时间',
            width: 150,
            dataIndex: 'publishTimeStr'
          }
        ],
        rowSelection: null
      }
    }
  },
  methods: {
    async toDetail(data) {
      await this.$router.push({
        name: 'parkNewsDetail',
        query: { id: data.articleId }
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
            articleTitle: (text, record) => (
              <a onClick={() => this.toDetail(record)}>
                {record.articleTitle}
              </a>
            )
            // status: (text, record) => (
            //   <Switch
            //     checked={+record.status === 1}
            //     onChange={checked => this.onStatusChange({ checked, record })}
            //   />
            // ),
          }
        }}
      />
    )
  }
}
