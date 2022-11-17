import '../assets/styles/index.scss'
import { Table, Space, Button } from 'ant-design-vue'
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
            // fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '存档时间',
            // fixed: true,
            dataIndex: 'saveTimeStr'
          },
          {
            title: '数据来源活动',
            dataIndex: 'objFromName'
          },
          {
            title: '备注',
            dataIndex: 'remark'
          },
          {
            title: '创建时间',
            dataIndex: 'createTimeStr'
          },
          {
            title: '创建人姓名',
            dataIndex: 'creatorName'
          },
          {
            title: '最后修改时间',
            dataIndex: 'lastUpdateTimeStr'
          },
          {
            title: '操作',
            align: 'center',
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  render() {
    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...this.attributes}
        {...{
          scopedSlots: {
            serialNumber: this.getConsecutiveSerialNumber,
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                // onClick={() => this.onEditClick(record)}
                >
                  生成报告
                </Button>
                <Button
                  type="link"
                  size="small"
                // onClick={() => this.onDeleteClick(record)}
                >
                  下载报告
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
