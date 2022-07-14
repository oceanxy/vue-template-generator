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
            title: '流水号',
            dataIndex: 'paySerialNumber'
          },
          {
            title: '缴费时间',
            dataIndex: 'payEndTime'
          },
          {
            title: '场地',
            scopedSlots: { customRender: 'address' }
          },
          {
            title: '企业',
            dataIndex: 'companyName'
          },
          {
            title: '缴费金额（￥）',
            width: 150,
            dataIndex: 'amount'
          },
          {
            title: '经办人',
            dataIndex: 'operateName'
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
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
        class={'bnm-rescind-contract-table'}
        {...attributes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1,
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
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfPaymentRecords')}
                >
                  查看明细
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
