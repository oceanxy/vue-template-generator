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
            width: 150,
            dataIndex: 'createTimeStr'
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
            title: '申请返校日期',
            width: 150,
            dataIndex: 'applyForTimeStr'
          },
          {
            title: '审核状态',
            width: 100,
            align: 'center',
            dataIndex: 'auditTypeStr'
          },
          {
            title: '审核结果',
            dataIndex: 'auditRemark'
          },
          {
            title: '操作人',
            align: 'center',
            width: 100,
            dataIndex: 'auditOperatorName'
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
        operation: (text, record) => (
          <Space>
            {
              record.auditType === 1
                ? (
                  <Button
                    type="link"
                    size="small"
                    onClick={() => this.onAuditClick(record)}
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
