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
            dataIndex: 'cityName'
          },
          {
            title: '性别',
            width: 80,
            align: 'center',
            dataIndex: 'countyName'
          },
          {
            title: '缺课天数',
            width: 80,
            align: 'center',
            dataIndex: 'countyName1'
          },
          {
            title: '登记类型',
            width: 80,
            align: 'center',
            dataIndex: 'countyName2'
          },
          {
            title: '病例类型',
            width: 80,
            align: 'center',
            dataIndex: 'countyName3'
          },
          {
            title: '学生症状',
            width: 80,
            align: 'center',
            dataIndex: 'countyName4'
          },
          {
            title: '诊断详情',
            width: 80,
            align: 'center',
            dataIndex: 'countyName5'
          },
          {
            title: '描述',
            width: 80,
            align: 'center',
            dataIndex: 'countyName6'
          },
          {
            title: '宿舍',
            width: 80,
            align: 'center',
            dataIndex: 'countyName7'
          }
        ]
      },
      scopedSlots: {
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
