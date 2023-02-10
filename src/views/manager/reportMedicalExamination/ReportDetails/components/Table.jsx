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
            align: 'center',
            width: 200,
            dataIndex: 'description'
          },
          {
            title: '操作',
            fixed: 'right',
            align: 'center',
            width: 120,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      },
      scopedSlots: {
        reportTimePeriod: (text, record) => ['晨检', '午检'][record.reportTimePeriod - 1],
        registerType: (text, record) => ['带病上课', '因病缺课', '因伤缺课', '其他原因缺课'][record.registerType - 1],
        operation: (text, record) => (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => this.onEditClick({ ...record, _isEdit: true })}
            >
              编辑
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
