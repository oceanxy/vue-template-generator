import '../assets/styles/index.scss'
import forTable from '@/mixins/forTable'
import { Button, Icon, Tooltip } from 'ant-design-vue'

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
            title: '学校名称',
            width: 200,
            fixed: true,
            customRender: (text, record) => (
              <Button
                type={'link'}
                onClick={() => this.getListBySchoolId(record.schoolId)}
              >
                {record.schoolName}
              </Button>
            )
          },
          {
            title: '总人数',
            align: 'center',
            dataIndex: 'stuNum'
          },
          {
            title: this.getTitle('上等', '身高>+2SD为上等（SD为标准差）'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, 0)
          },
          {
            title: this.getTitle('中上等', '身高>+1SD且≤+2SD为中上等（SD为标准差）'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, 1)
          },
          {
            title: this.getTitle('中等', '身高>-1SD且≤+1SD为中等（SD为标准差）'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, 2)
          },
          {
            title: this.getTitle('中下等', '身高>-2SD且≤-1SD为中下等（SD为标准差）'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, 3)
          },
          {
            title: this.getTitle('下等', '身高≤-2SD为下等（SD为标准差）'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, 4)
          },
          {
            title: this.getTitle('未收录', '数据没有对比标准'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, 5)
          }
        ],
        rowSelection: null
      },
      hierarchy: 'school'
    }
  },
  computed: {
    search() {
      return this.$store.state[this.moduleName].search
    },
    listBySchoolId() {
      return this.$store.state[this.moduleName].listBySchoolId
    },
    listByGradeId() {
      return this.$store.state[this.moduleName].listByGradeId
    },
    list() {
      return this.$store.state[this.moduleName].list
    },
    attributes() {
      const events = {}
      let dataSource

      if (this.sortFieldList?.length) {
        events.change = this.onChange
      }

      if (this.hierarchy === 'class') {
        dataSource = this.listByGradeId
      } else if (this.hierarchy === 'grade') {
        dataSource = this.listBySchoolId
      } else {
        dataSource = this.list
      }

      return {
        props: {
          ...this.tableProps,
          dataSource,
          loading: this.loading
        },
        on: { ...events }
      }
    }
  },
  // 本页面通过监听 store.state.search 的变化来请求数据，左侧树和 inquiry 内的请求数据逻辑已关闭
  watch: {
    search: {
      deep: true,
      handler(obj = {}) {
        if (obj.activityId && (obj.countyId || obj.streetId)) {
          this.fetchList({ customApiName: 'getActivityHeightBySchool' })
        }
      }
    }
  },
  methods: {
    getLevelData(text, record, index) {
      return `${
        record.levelList?.[index]?.studentsNum ?? '-'
      }人 / ${
        record.levelList?.[index]?.proportion ?? '-'
      }%`
    },
    getTitle(title, description) {
      return (
        <div>
          {title}&nbsp;
          <Tooltip title={description}>
            <Icon type="question-circle" />
          </Tooltip>
        </div>
      )
    },
    async getListBySchoolId(schoolId) {
      this.hierarchy = 'grade'

      await this.$store.dispatch('activityHeightStatisticsByGrade/getList', {
        moduleName: this.moduleName,
        stateName: 'listBySchoolId',
        customApiName: 'getActivityHeightByGrade',
        payload: { schoolId }
      })
    },
    async getListByGradeId(gradeId) {
      this.hierarchy = 'class'

      await this.$store.dispatch('activityHeightStatisticsByGrade/getList', {
        moduleName: this.moduleName,
        stateName: 'listByGradeId',
        customApiName: 'getActivityHeightByClass',
        payload: { gradeId }
      })
    }
  }
}
