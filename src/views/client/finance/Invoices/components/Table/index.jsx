import forTable from '@/mixins/forTable'
import { Table } from 'ant-design-vue'

export default {
  mixins: [forTable()],
  data: () => ({
    tableProps: {
      columns: [
        {
          title: '序号',
          width: 60,
          align: 'center',
          scopedSlots: { customRender: 'serialNumber' }
        },
        {
          title: '开票时间',
          dataIndex: 'createTimeStr'
        },
        {
          title: '开票号',
          dataIndex: 'taxNum'
        },
        {
          title: '发票抬头',
          dataIndex: 'invoiceHead',
          scopedSlots: { customRender: 'invoiceHead' }
        },
        {
          title: '发票金额',
          dataIndex: 'amount',
          scopedSlots: { customRender: 'amount' }
        },
        {
          title: '接收邮箱',
          dataIndex: 'email'
        }
        // {
        //   title: '操作',
        //   width: 100,
        //   align: 'center',
        //   scopedSlots: { customRender: 'operation' }
        // }
      ],
      rowSelection: null
    }
  }),
  methods: {
    onDownloadClick(record) {
      window.open(record.invoiceUrl)
    }
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName)
      }
    }

    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...attributes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1,
            amount: (text, record) => {
              return <span style={{ color: 'red' }}>￥{record.amount}</span>
            }
            // operation: (text, record) => (
            //   <Button type="link" onClick={() => this.onDownloadClick(record)}>
            //     下载发票
            //   </Button>
            // )
          }
        }}
      />
    )
  }
}
