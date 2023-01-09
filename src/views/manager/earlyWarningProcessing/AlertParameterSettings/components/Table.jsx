import forTable from '@/mixins/forTable'
import { Button, Space } from 'ant-design-vue'

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
            title: '预警类型',
            width: 120,
            dataIndex: 'parentName'
          },
          {
            title: '预警范围',
            dataIndex: 'fullName'
          },
          {
            title: '预警时间范围（天）',
            width: 160,
            align: 'center',
            dataIndex: 'provinceName'
          },
          {
            title: '发生最低例数',
            width: 140,
            align: 'center',
            dataIndex: 'provinceName2'
          },
          {
            title: '症状名称',
            align: 'center',
            dataIndex: 'cityName'
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
        operation: (text, record) => (
          <Space>
            <Button
              type="link"
              size="small"
            >
              编辑
            </Button>
            <Button
              type="link"
              size="small"
            >
              删除
            </Button>
          </Space>
        )
      }
    }
  }
}
