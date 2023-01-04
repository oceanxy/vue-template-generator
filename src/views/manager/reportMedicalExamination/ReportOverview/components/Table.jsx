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
            title: '异常人数',
            width: 80,
            align: 'center',
            dataIndex: 'cityName'
          },
          {
            title: '上报时段',
            width: 80,
            align: 'center',
            dataIndex: 'countyName'
          },
          {
            title: '上报状态',
            width: 150,
            align: 'center',
            dataIndex: 'streetName'
          },
          {
            title: '上报人',
            width: 200,
            dataIndex: 'orgDescribe'
          },
          {
            title: '填报时间',
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
