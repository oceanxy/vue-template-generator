import forTable from '@/mixins/forTable'
import { Button, Space, Tag } from 'ant-design-vue'

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
            title: '计划名称',
            width: 120,
            dataIndex: 'parentName'
          },
          {
            title: '学校',
            width: 220,
            dataIndex: 'fullName'
          },
          {
            title: '班级',
            width: 80,
            align: 'center',
            dataIndex: 'provinceName'
          },
          {
            title: '截止日期',
            width: 80,
            align: 'center',
            dataIndex: 'cityName'
          },
          {
            title: '添加时间',
            width: 80,
            align: 'center',
            dataIndex: 'countyName'
          },
          {
            title: '完成情况',
            align: 'center',
            width: 80,
            fixed: 'right',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            fixed: 'right',
            align: 'center',
            width: 150,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      },
      scopedSlots: {
        status: (text, record) => {
          return record.status === 1 ? <Tag color="green">启用</Tag> : <Tag color="red">停用</Tag>
        },
        operation: (text, record) => (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => this.onEditClick(record)}
            >
              查看
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => this.onDeleteClick(record)}
            >
              删除
            </Button>
          </Space>
        )
      }
    }
  }
}
