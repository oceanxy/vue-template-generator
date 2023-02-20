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
            width: 80,
            align: 'center',
            dataIndex: 'fullName'
          },
          {
            title: '性别',
            width: 80,
            align: 'center',
            dataIndex: 'genderStr'
          },
          {
            title: '年龄',
            width: 80,
            align: 'center',
            dataIndex: 'age'
          },
          {
            title: '班级',
            width: 120,
            align: 'center',
            dataIndex: 'gradeClassStr'
          },
          {
            title: '宿舍',
            width: 150,
            align: 'center',
            scopedSlots: { customRender: 'roomNo' }
          },
          {
            title: '症状',
            width: 150,
            dataIndex: 'symptomName'
          },
          {
            title: '诊断',
            dataIndex: 'diagnoseName'
          }
        ],
        rowSelection: null
      },
      scopedSlots: {
        roomNo: (text, record) => `${record.floorName}${record.roomNo}`
      }
    }
  }
}
