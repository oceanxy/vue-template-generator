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
            title: '月份',
            width: 150,
            dataIndex: 'billMonth'
          },
          {
            title: '场地',
            width: 160,
            dataIndex: 'address'
            // scopedSlots: { customRender: 'address' }
          },
          {
            title: '企业',
            width: 200,
            dataIndex: 'companyName'
          },
          {
            title: '金额',
            width: 150,
            dataIndex: 'amountStr'
          },
          {
            title: '结清状态',
            width: 80,
            fixed: 'right',
            dataIndex: 'payStatusStr'
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 150,
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
            address: (text, record) => (
              <ul style={{ paddingLeft: '20px', marginBottom: 0 }}>
                {
                  record.address?.split(',').map(item => (
                    <li>{item}</li>
                  ))
                }
              </ul>
            ),
            operation: (text, record) => (
              <Space>
                {
                  record.payStatus === 1 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this.onEditClick(record)}
                    >
                      修改金额
                    </Button>
                  ) : null
                }
              </Space>
            )
          }
        }}
      />
    )
  }
}
