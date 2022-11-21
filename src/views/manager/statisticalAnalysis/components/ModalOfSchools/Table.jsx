import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable({ customApiName: 'getSchoolsForStatisticalAnalysis' })],
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
            title: '学校名称',
            dataIndex: 'fullName'
          },
          {
            title: '所属镇街',
            dataIndex: 'streetName'
          },
          {
            title: '类型',
            dataIndex: 'schoolType',
            scopedSlots: { customRender: 'schoolType' }
          }
        ],
        rowSelection: null
      },
      scopedSlots: {
        schoolType: text => {
          switch (text) {
            case 111:
              return '幼儿园'
            case 211:
              return '小学'
            case 241:
              return '完全小学'
            case 311:
              return '初级中学'
            case 341:
              return '完全中学'
            case 365:
              return '职业高中'
            case 411:
              return '大学'
            default:
              return ''
          }
        }
      }
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
