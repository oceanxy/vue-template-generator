import '../assets/styles/index.scss'
import forTable from '@/mixins/forTable'
import { Tag } from 'ant-design-vue'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 70,
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '姓名',
            width: 80,
            align: 'center',
            fixed: true,
            dataIndex: 'fullName'
          },
          {
            title: '身份证号',
            width: 170,
            dataIndex: 'idNumber'
          },
          {
            title: '活动名称',
            width: 200,
            dataIndex: 'activityName'
          },
          {
            title: '组织机构',
            width: 200,
            dataIndex: 'activityOrgName'
          },
          {
            title: '学校名称',
            width: 200,
            dataIndex: 'peObjOrgName'
          },
          {
            title: '年级',
            width: 100,
            align: 'center',
            dataIndex: 'gradeStr'
          },
          {
            title: '班级',
            width: 70,
            align: 'center',
            dataIndex: 'classNumber'
          },
          {
            title: '性别',
            width: 70,
            align: 'center',
            scopedSlots: { customRender: 'gender' }
          },
          {
            title: '年龄',
            align: 'center',
            width: 70,
            dataIndex: 'age'
          },
          {
            title: '身高（cm）',
            width: 100,
            align: 'center',
            dataIndex: 'heightStr'
          },
          {
            title: '体重（kg）',
            align: 'center',
            width: 100,
            dataIndex: 'weightStr'
          },
          {
            title: 'BMI',
            align: 'center',
            width: 70,
            dataIndex: 'bmi'
          },

          {
            title: '结论等级',
            align: 'center',
            width: 100,
            dataIndex: 'conclusionLevelName'
          },
          {
            title: '设备名称',
            align: 'center',
            width: 100,
            dataIndex: 'devName'
          },
          {
            title: '体检时间',
            width: 140,
            align: 'center',
            dataIndex: 'createTimeStr'
          }
        ],
        rowSelection: null
      },
      scopedSlots: {
        gender: (text, record) => {
          return <Tag color={['', '#84adff', '#fea3b4'][+record.gender]}>{record.genderStr}</Tag>
        }
      }
    }
  }
}
