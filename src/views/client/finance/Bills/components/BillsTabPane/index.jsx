import { Table, Tag, Button } from 'ant-design-vue'

export default {
  inject: ['moduleName'],
  props: {
    activeKey: {
      type: String,
      default: '1'
    },
    data: Array
  },
  data: () => ({
    columns: [
      {
        title: '序号',
        width: 60,
        align: 'center',
        scopedSlots: { customRender: 'serialNumber' }
      },
      {
        title: '账单类型',
        width: 100,
        dataIndex: 'itemName'
      },
      {
        title: '月份',
        dataIndex: 'billDate'
      },
      {
        title: '场地',
        dataIndex: 'address'
      },
      {
        title: '企业',
        dataIndex: 'companyName'
      },
      {
        title: '金额',
        dataIndex: 'realAmount'
      },
      {
        title: '结清状态',
        dataIndex: 'status',
        scopedSlots: { customRender: 'status' }
      },
      {
        title: '操作',
        width: 100,
        align: 'center',
        scopedSlots: { customRender: 'operation' }
      }
    ],
    dataSource: []
  }),
  computed: {},
  methods: {
    onPay() {}
  },
  render() {
    const statusStr = row => {
      if (row.payStatus === 1) return <Tag color="red">{row.payStatusStr}</Tag>
      else if (row.payStatus === 2) {
        return <Tag color="#1a64bf">{row.payStatusStr}</Tag>
      } else if (row.payStatus === 3) {
        return <Tag color="#1abf36">{row.payStatusStr}</Tag>
      } else if (row.payStatus === 4) {
        return <Tag color="#bf661a">{row.payStatusStr}</Tag>
      } else {
        return <Tag color="#a3a2a5">{row.payStatusStr}</Tag>
      }
    }

    return (
      <Table
        ref={`${this.moduleName}Table`}
        columns={this.columns}
        dataSource={this.data}
        pagination={false}
        rowKey="id"
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1,
            status: (text, record) => statusStr(record),
            operation: (text, record) => <Button onClick={() => this.onPay(record.id)}>缴费</Button>
          }
        }}
      />
    )
  }
}
