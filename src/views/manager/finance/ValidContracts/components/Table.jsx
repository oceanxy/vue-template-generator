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
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '合同编号',
            dataIndex: 'contractNo'
          },
          {
            title: '企业名称',
            dataIndex: 'companyName'
          },
          {
            title: '场地',
            scopedSlots: { customRender: 'address' }
          },
          {
            title: '保证金',
            width: 100,
            dataIndex: 'marginAmount'
          },
          {
            title: '累计账单',
            width: 100,
            dataIndex: 'billAmount'
          },
          {
            title: '累计缴费',
            width: 100,
            dataIndex: 'payAmount'
          },
          {
            title: '当前欠缴',
            width: 100,
            scopedSlots: { customRender: 'oweAmount' }
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 300,
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
        class={'bnm-rescind-contract-table'}
        {...attributes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1,
            oweAmount: (text, record) => <div style={{ color: '#f5222d' }}>{record.oweAmount}</div>,
            address: (text, record) => (
              <ul style={{ paddingLeft: '20px', marginBottom: 0 }}>
                {
                  record.address.split(',').map(item => (
                    <li>{item}</li>
                  ))
                }
              </ul>
            ),
            operation: (text, record) => (
              <Space class="operation-space">
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onEditClick(record)}
                >
                  企业缴费
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfUrgingPayment')}
                >
                  催费消息
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfBills')}
                >
                  账单查询
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfPaymentRecords')}
                >
                  缴费记录
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
