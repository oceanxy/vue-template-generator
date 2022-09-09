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
            title: '企业名称',
            width: 200,
            dataIndex: 'companyName'
          },
          {
            title: '场地',
            width: 160,
            scopedSlots: { customRender: 'address' }
          },
          {
            title: '保证金金额（￥）',
            width: 150,
            dataIndex: 'amount'
          },
          {
            title: '状态',
            width: 80,
            fixed: 'right',
            dataIndex: 'earnestStatusStr'
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
            serialNumber: (text, record, index) => index + 1,
            address: (text, record) => (
              <ul style={{
                paddingLeft: '20px',
                marginBottom: 0
              }}>
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
                  record.earnestStatus === 1 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this.onEditClick(record)}
                    >
                      收款
                    </Button>
                  ) : null
                }
                {
                  record.earnestStatus === 2 || record.earnestStatus === 6 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this.onEditClick(record)}
                    >
                      退款
                    </Button>
                  ) : null
                }
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfPaymentRecords')}
                >
                  变动记录
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
