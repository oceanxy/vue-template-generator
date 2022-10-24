import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            align: 'center',
            width: 60,
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '企业',
            width: 200,
            dataIndex: 'companyName'
          },
          {
            title: '税号',
            width: 150,
            dataIndex: 'taxNum'
          },
          {
            title: '开票金额',
            width: 100,
            dataIndex: 'amount'
          },
          {
            title: '发票抬头',
            width: 100,
            dataIndex: 'invoiceHead'
          },
          {
            title: '场地',
            width: 150,
            scopedSlots: { customRender: 'address' }
          },
          {
            title: '开票状态',
            width: 80,
            align: 'center',
            fixed: 'right',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
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
            serialNumber: (text, record, index) => index + 1 + this.serialNumber,
            status: (text, record) => (
              <span style={{ color: ['#52c41a', '#fa541c'][record.invoiceStatus - 1] }}>
                {record.invoiceStatusStr}
              </span>
            ),
            address: (text, record) => (
              <ul
                style={{
                  paddingLeft: '20px',
                  marginBottom: 0
                }}
              >
                {
                  record.contractAddress?.split(',').map(item => (
                    <li>{item}</li>
                  ))
                }
              </ul>
            ),
            operation: (text, record) => (
              <Space>
                {
                  record.invoiceStatus === 1
                    ? (
                      <Button
                        type="link"
                        size="small"
                      >
                        <a
                          href={record.invoiceUrl}
                          target={'_blank'}
                        >
                          下载发票
                        </a>
                      </Button>
                    )
                    : null
                }
                {
                  record.invoiceStatus !== 1 && +record.amountVal !== 0
                    ? (
                      <Button
                        type="link"
                        size="small"
                        onClick={() => this.onEditClick(record)}
                      >
                        开具发票
                      </Button>
                    )
                    : null
                }
              </Space>
            )
          }
        }}
      />
    )
  }
}
