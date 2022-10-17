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
            width: 60,
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '报表',
            width: 200,
            dataIndex: 'reportName'
          },
          {
            title: '企业',
            width: 200,
            dataIndex: 'objName'
          },
          {
            title: '场所',
            width: 150,
            dataIndex: 'place'
          },
          {
            title: '联系电话',
            width: 80,
            scopedSlots: { customRender: 'phone' }
          },
          {
            title: '填报状态',
            width: 100,
            dataIndex: 'fillStatus'
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
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfRemind')}
                >
                  催报
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
