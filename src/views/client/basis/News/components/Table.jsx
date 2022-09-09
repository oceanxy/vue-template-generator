import '../assets/styles/index.scss'
import { Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        rowSelection: { fixed: false },
        columns: [
          {
            title: '消息内容',
            dataIndex: 'messageTitle'
          },
          {
            title: '接收时间',
            width: 150,
            dataIndex: 'publishTimeStr'
          },
          {
            title: '发布人',
            width: 150,
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
            expandedRowRender: record => record.content
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
