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
            width: 140,
            dataIndex: 'reportTimeStr'
          },
          {
            title: '学校',
            width: 220,
            dataIndex: 'schoolName'
          },
          {
            title: '班级',
            width: 120,
            align: 'center',
            dataIndex: 'gradeClassStr'
          },
          {
            title: '学生',
            width: 80,
            align: 'center',
            dataIndex: 'studentName'
          },
          {
            title: '性别',
            width: 80,
            align: 'center',
            dataIndex: 'genderStr'
          },
          {
            title: '上报时段',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'reportTimePeriod' }
          },
          {
            title: '登记类型',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'registerType' }
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
            title: '审核状态',
            width: 80,
            align: 'center',
            dataIndex: 'auditStatusStr'
          },
          {
            title: '描述',
            width: 200,
            dataIndex: 'description'
          },
          {
            title: '操作',
            fixed: 'right',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'operation' }
          }
        ],
        rowSelection: null
      },
      scopedSlots: {
        operation: (text, record) => (
          <Space>
            {
              record.auditStatus === 1
                ? (
                  <Button
                    type="link"
                    size="small"
                    onClick={() => this.onAuditClick(record, 'visibilityOfReview')}
                  >
                    审核
                  </Button>
                )
                : null
            }
          </Space>
        )
      }
    }
  }
}
