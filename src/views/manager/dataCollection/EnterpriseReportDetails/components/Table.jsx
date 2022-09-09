import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      visibleField: 'visibleOfDetails',
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
            title: '报表',
            fixed: true,
            width: 150,
            dataIndex: 'reportName'
          },
          {
            title: '企业',
            width: 250,
            dataIndex: 'objName'
          },
          {
            title: '场所',
            width: 300,
            dataIndex: 'place'
          },
          {
            title: '联系电话',
            width: 120,
            dataIndex: 'phone'
          },
          {
            title: '填报状态',
            width: 80,
            fixed: 'right',
            dataIndex: 'fillStatus'
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
                <Button type="link" size="small" onClick={() => this._setVisibleOfModal(record, 'visibleOfDetails')}>
                  查看详情
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
