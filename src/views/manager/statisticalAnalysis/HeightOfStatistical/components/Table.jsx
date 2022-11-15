import '../assets/styles/index.scss'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable({ isFetchList: false })],
  computed: {
    activities() {
      return this.getState('activities', this.moduleName)
    }
  },
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
            title: '学校名称',
            width: 200,
            dataIndex: 'peObjOrgName'
          },
          {
            title: '年级',
            width: 70,
            align: 'center',
            dataIndex: 'grade'
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
            title: '收缩压（mmHg）',
            align: 'center',
            width: 110,
            dataIndex: 'systolicPressure'
          },
          {
            title: '舒张压（mmHg）',
            align: 'center',
            width: 110,
            dataIndex: 'diastolicPressure'
          },
          {
            title: '脉搏（bpm）',
            align: 'center',
            width: 100,
            dataIndex: 'pulseNum'
          },
          {
            title: '肺活量（ml）',
            align: 'center',
            width: 90,
            dataIndex: 'vc'
          },
          {
            title: '左眼视力',
            align: 'center',
            width: 100,
            dataIndex: 'leftVision'
          },
          {
            title: '右眼视力',
            align: 'center',
            width: 100,
            dataIndex: 'rightVision'
          },
          {
            title: '营养情况',
            align: 'center',
            width: 100,
            dataIndex: 'conclusionLevelName'
          },
          {
            title: '发育情况',
            align: 'center',
            width: 100,
            dataIndex: 'development'
          },
          {
            title: '体型',
            align: 'center',
            width: 70,
            dataIndex: 'size'
          },
          {
            title: '体检时间',
            width: 140,
            align: 'center',
            dataIndex: 'createTimeStr'
          }
        ],
        rowSelection: null
      }
    }
  },
  watch: {
    activities(value) {
      debugger
    }
  }
}
