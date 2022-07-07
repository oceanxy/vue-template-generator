import '../assets/styles/index.scss'
import { Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '消息内容',
            dataIndex: 'title'
          },
          {
            title: '接收时间',
            dataIndex: 'publishTimeStr'
          },
          {
            title: '发布人',
            dataIndex: 'publisherName'
          }
        ]
      }
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
            expandedRowRender: record => {
              return <p style={{ margin: 0 }}>{record.content}</p>
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
