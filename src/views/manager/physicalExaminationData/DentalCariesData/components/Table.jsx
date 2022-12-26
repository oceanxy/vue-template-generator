import '../assets/styles/index.scss'
import forTable from '@/mixins/forTable'
import { Tag } from 'ant-design-vue'

export default {
  mixins: [forTable({ isFetchList: false })],
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
            dataIndex: 'genderStr'
          },
          {
            title: '年龄',
            align: 'center',
            width: 70,
            dataIndex: 'age'
          },
          {
            title: '病史状态',
            align: 'center',
            width: 100,
            dataIndex: 'medicalHistoryStatus',
            scopedSlots: { customRender: 'medicalHistoryStatus' }
          },
          {
            title: '病史异常项',
            align: 'center',
            width: 110,
            dataIndex: 'medicalHistoryException'
          },
          {
            title: '龋齿左上部',
            align: 'center',
            width: 110,
            dataIndex: 'cariesUpperLeft'
          },
          {
            title: '龋齿右上部',
            align: 'center',
            width: 110,
            dataIndex: 'cariesUpperRight'
          },
          {
            title: '龋齿左下部',
            align: 'center',
            width: 110,
            dataIndex: 'cariesLowerLeft'
          },
          {
            title: '龋齿右下部',
            align: 'center',
            width: 110,
            dataIndex: 'cariesLowerRight'
          },
          {
            title: '牙周疾病状态',
            align: 'center',
            width: 130,
            dataIndex: 'periodontalStatus',
            scopedSlots: { customRender: 'periodontalStatus' }
          },
          {
            title: '牙周疾病异常项',
            align: 'center',
            width: 130,
            dataIndex: 'periodontalException'
          },
          {
            title: '沙眼状态',
            align: 'center',
            width: 110,
            dataIndex: 'trachomaStatus',
            scopedSlots: { customRender: 'trachomaStatus' }
          },
          {
            title: '沙眼异常项',
            align: 'center',
            width: 110,
            dataIndex: 'trachomaException'
          },
          {
            title: '结膜炎状态',
            align: 'center',
            width: 110,
            dataIndex: 'conjunctivitisStatus',
            scopedSlots: { customRender: 'conjunctivitisStatus' }
          },
          {
            title: '结膜炎异常项',
            align: 'center',
            width: 110,
            dataIndex: 'conjunctivitisException'
          },
          {
            title: '结论',
            align: 'center',
            width: 100,
            dataIndex: 'conclusion'
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
        medicalHistoryStatus: text => this.getTag(text, ['无', '有']),
        periodontalStatus: text => this.getTag(text, ['无', '有']),
        trachomaStatus: text => this.getTag(text, ['无', '有']),
        conjunctivitisStatus: text => this.getTag(text, ['无', '有'])
      }
    }
  },
  methods: {
    getTag(value, labelArr = ['正常', '异常']) {
      return (
        <Tag color={['rgba(22, 179, 100, 0.6)', 'rgba(179, 22, 22, 0.6)'][value]}>
          {labelArr[value]}
        </Tag>
      )
    }
  }
}
