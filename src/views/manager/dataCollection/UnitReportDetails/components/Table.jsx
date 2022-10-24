import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      visibleField: 'visibleOfDetails',
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
            width: 150,
            dataIndex: 'reportName'
          },
          {
            title: '监管单位',
            width: 200,
            dataIndex: 'objName'
          },
          {
            title: '场所',
            width: 200,
            dataIndex: 'place'
          },
          {
            title: '联系电话',
            width: 100,
            dataIndex: 'phone'
          },
          {
            title: '填报状态',
            width: 100,
            align: 'center',
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
            serialNumber: (text, record, index) => index + 1 + this.serialNumber,
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfDetails')}
                >
                  查看详情
                </Button>
                <Button
                  type="link"
                  size="small"
                  disabled={this.exportButtonDisabled}
                  onClick={() => this.onExport({ recordIds: record.id }, '监管单位报表明细')}
                >
                  导出
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
