import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  // 来自于 statisticalAnalysis 下的页面的入口文件(index.jsx)
  inject: ['customApiNameForStudents'],
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
            title: '身份证号',
            width: 170,
            dataIndex: 'idNumber'
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
            title: '体检时间',
            width: 140,
            align: 'center',
            dataIndex: 'createTimeStr'
          }
        ],
        rowSelection: null
      },
      // 为 forTable 提供
      customApiName: this.customApiNameForStudents
    }
  },
  computed: {
    search() {
      return this.$store.state[this.moduleName].search
    },
    additionalQueryParameters() {
      return {
        activityId: this.search.activityId,
        schoolTypes: this.search.schoolTypes,
        range: this.search.range
      }
    }
  }
}
