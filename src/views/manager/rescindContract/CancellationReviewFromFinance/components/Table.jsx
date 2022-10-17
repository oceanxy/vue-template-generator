import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        rowSelection: null,
        columns: [
          {
            title: '序号',
            width: 60,
            fixed: true,
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '企业',
            width: 200,
            fixed: true,
            dataIndex: 'companyName'
          },
          {
            title: '合同编号',
            width: 140,
            dataIndex: 'contractNo'
          },
          {
            title: '签约场地',
            width: 120,
            scopedSlots: { customRender: 'address' }
          },
          {
            title: '签约期限',
            width: 120,
            dataIndex: 'contractTime'
          },
          {
            title: '解约原因',
            width: 200,
            dataIndex: 'reason'
          },
          {
            title: '应结账款',
            width: 120,
            scopedSlots: { customRender: 'settlementMoney' }
          },
          {
            title: '状态',
            width: 100,
            fixed: 'right',
            dataIndex: 'signingStatusStr'
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
            serialNumber: (text, record, index) => index + 1,
            address: (text, record) => (
              <ul
                style={{
                  paddingLeft: '20px',
                  marginBottom: 0
                }}
              >
                {
                  record.address?.split(',').map(item => (
                    <li>{item}</li>
                  ))
                }
              </ul>
            ),
            settlementMoney: (text, record) => {
              return record.settlementMoney
                ? <span style={{ color: 'rgb(245, 34, 45)' }}>￥ {record.settlementMoney}</span>
                : '-'
            },
            operation: (text, record) => (
              <Space>
                {
                  record.signingStatus === 2 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this._setVisibleOfModal(record, 'visibleOfReview')}
                    >
                      审核
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
