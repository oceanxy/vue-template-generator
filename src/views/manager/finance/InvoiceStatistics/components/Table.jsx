import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        rowKey: 'companyId',
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
            dataIndex: 'companyName'
          },
          {
            title: '累计已开票',
            width: 100,
            align: 'center',
            dataIndex: 'amount'
          },
          {
            title: '物业管理费',
            width: 100,
            align: 'center',
            dataIndex: 'propertyAmount'
          },
          {
            title: '场地租金',
            width: 100,
            align: 'center',
            dataIndex: 'placeAmount'
          },
          {
            title: '水电费',
            width: 100,
            align: 'center',
            dataIndex: 'utilityAmount'
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 120,
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
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfDetails')}
                >
                  查看开票明细
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
