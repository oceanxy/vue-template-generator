import forTable from '@/mixins/forTable'
import { Icon, Tooltip } from 'ant-design-vue'

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
            title: '年级',
            width: 100,
            align: 'center',
            fixed: true,
            dataIndex: 'gradeStr'
          },
          {
            title: '总人数',
            align: 'center',
            dataIndex: 'stuNum'
          },
          {
            title: this.getTitle('正常血压', '收缩压和舒张压<同性别、同年龄、同身高百分位血压 P90'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, '正常血压')
          },
          {
            title: this.getTitle(
              '正常高值血压',
              '收缩压和舒张压≥同性别、同年龄、同身高百分位血压 P90 且 收缩压和舒张压<同性别、同年龄、同身高百分位血压 P95'
            ),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, '正常高值血压')
          },
          {
            title: this.getTitle('血压偏高', '收缩压和舒张压≥同性别、同年龄、同身高百分位血压 P95'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, '血压偏高')
          },
          {
            title: this.getTitle('未收录', '数据没有对比标准'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, '未收录')
          }
        ],
        rowSelection: null
      }
    }
  },
  computed: {
    search() {
      return this.$store.state[this.moduleName].search
    }
  },
  // 因为搜索存在必传参数，所以本页面通过监听 store.state.search 的变化来请求数据，左侧树和 inquiry 内的请求数据逻辑已关闭
  watch: {
    search: {
      deep: true,
      async handler(obj = {}) {
        if (obj.activityId && (obj.countyId || obj.streetId || obj.schoolId)) {
          await this.fetchList()
        }
      }
    }
  },
  methods: {
    getLevelData(text, record, columnName) {
      const data = record.levelList?.find(item => item.levelName === columnName) ?? {}

      return `${data.studentsNum ?? '-'}人 / ${data.proportion ?? '-'}%`
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
    }
  }
}
