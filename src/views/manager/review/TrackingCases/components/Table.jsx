import forTable from '@/mixins/forTable'
import { Button, Space, Tag } from 'ant-design-vue'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        rowSelection: null,
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
            width: 150,
            dataIndex: 'createTimeStr'
          },
          {
            title: '学校',
            width: 200,
            dataIndex: 'schoolName'
          },
          {
            title: '班级',
            width: 120,
            dataIndex: 'gradeClassStr'
          },
          {
            title: '学生',
            width: 100,
            align: 'center',
            dataIndex: 'studentName'
          },
          {
            title: '性别',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'gender' }
          },
          {
            title: '学生症状',
            width: 150,
            dataIndex: 'symptomName'
          },
          {
            title: '诊断详情',
            width: 150,
            dataIndex: 'diagnoseName'
          },
          {
            title: '状态',
            width: 100,
            align: 'center',
            dataIndex: 'traceStatusStr'
          },
          {
            title: '描述',
            dataIndex: 'description'
          },
          {
            title: '操作',
            fixed: 'right',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      },
      scopedSlots: {
        gender: (text, record) => {
          return <Tag color={['', '#84adff', '#fea3b4'][+record.gender]}>{record.genderStr}</Tag>
        },
        operation: (text, record) => (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => this.onDetailsClick(record)}
            >
              详情
            </Button>
          </Space>
        )
      }
    }
  }
}
