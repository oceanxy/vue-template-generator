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
            title: '问卷标题',
            width: 250,
            dataIndex: 'reportName'
          },
          {
            title: '填写企业名称',
            width: 250,
            dataIndex: 'objName'
          },
          {
            title: '负责人',
            width: 100,
            dataIndex: 'dutyPerson'
          },
          {
            title: '联系电话',
            width: 100,
            dataIndex: 'phone'
          },
          {
            title: '填写时间',
            width: 140,
            dataIndex: 'createTimeStr'
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
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfResults')}
                >
                  查看结果
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
