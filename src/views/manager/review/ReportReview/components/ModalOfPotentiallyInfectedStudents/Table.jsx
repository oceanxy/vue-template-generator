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
            title: '姓名',
            width: 120,
            dataIndex: 'parentName'
          },
          {
            title: '性别',
            width: 220,
            dataIndex: 'fullName'
          },
          {
            title: '年龄',
            width: 80,
            align: 'center',
            dataIndex: 'provinceName'
          },
          {
            title: '班级',
            width: 80,
            align: 'center',
            dataIndex: 'provinceName2'
          },
          {
            title: '宿舍',
            width: 80,
            align: 'center',
            dataIndex: 'cityName'
          },
          {
            title: '症状',
            width: 80,
            align: 'center',
            dataIndex: 'countyName'
          },
          {
            title: '诊断',
            width: 150,
            align: 'center',
            dataIndex: 'streetName4'
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
              查看
            </Button>
            <Button
              type="link"
              size="small"
            >
              添加上报
            </Button>
          </Space>
        )
      }
    }
  }
}
