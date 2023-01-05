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
            title: '上报日期',
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
            title: '学生',
            width: 80,
            align: 'center',
            dataIndex: 'provinceName2'
          },
          {
            title: '性别',
            width: 80,
            align: 'center',
            dataIndex: 'cityName'
          },
          {
            title: '缺课天数',
            width: 80,
            align: 'center',
            dataIndex: 'countyName'
          },
          {
            title: '上报时段',
            width: 150,
            align: 'center',
            dataIndex: 'streetName4'
          },
          {
            title: '登记类型',
            width: 150,
            align: 'center',
            dataIndex: 'streetName3'
          },
          {
            title: '学生症状',
            width: 150,
            align: 'center',
            dataIndex: 'streetName2'
          },
          {
            title: '诊断详情',
            width: 150,
            align: 'center',
            dataIndex: 'streetName1'
          },
          {
            title: '审核状态',
            width: 200,
            dataIndex: 'orgDescribe'
          },
          {
            title: '描述',
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
