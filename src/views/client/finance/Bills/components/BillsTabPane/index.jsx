import forTable from '@/mixins/forTable'
import { Table } from 'ant-design-vue'

export default {
  props: {
    activeKey: {
      type: String,
      default: '1'
    }
  },
  mixins: [forTable()],
  data: () => ({
    columns: [
      {
        title: '序号',
        scopedSlots: { customRender: 'allPath' }
      },
      {
        title: '账单类型',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '月份',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '场地',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '企业',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '金额',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '结清状态',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '操作',
        width: 60,
        align: 'center',
        scopedSlots: { customRender: 'operation' }
      }
    ],
    dataSource: []
  }),
  render() {
    return (
      <Table
        ref={`${this.moduleName}Table`}
        columns={this.columns}
        dataSource={this.dataSource}
        rowKey="id"
        {...{
          scopedSlots: {
            allPath: (text, record) => (
              <Input
                vModel={record.allPath}
                placeholder="请输入完整路径"
                onBlur={this.onChange}
              />
            ),
            remark: (text, record) => (
              <Input
                vModel={record.remark}
                placeholder="请输入备注"
                onBlur={this.onChange}
              />
            ),
            operation: (text, record) => (
              <Button onClick={() => this.onDelClick(record.id)}>缴费</Button>
            )
          }
        }}
      />
    )
  }
}
