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
            title: '提交时间',
            width: 120,
            dataIndex: 'parentName'
          },
          {
            title: '班级',
            width: 80,
            align: 'center',
            dataIndex: 'provinceName'
          },
          {
            title: '学生',
            width: 80,
            align: 'center',
            dataIndex: 'provinceName2'
          },
          {
            title: '申请返校日期',
            width: 80,
            align: 'center',
            dataIndex: 'cityName'
          },
          {
            title: '审核状态',
            width: 200,
            dataIndex: 'orgDescribe'
          },
          {
            title: '审核结果',
            width: 200,
            dataIndex: 'result'
          },
          {
            title: '操作人',
            align: 'center',
            width: 80,
            dataIndex: 'sortIndex'
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
              审核
            </Button>
          </Space>
        )
      }
    }
  }
}
