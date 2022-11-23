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
            width: 80,
            align: 'center',
            fixed: true,
            dataIndex: 'grade'
          },
          {
            title: '总人数',
            align: 'center',
            dataIndex: 'stuNum'
          },
          {
            title: this.getTitle('上等', '身高>+2SD为上等（SD为标准差）'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, '上等')
          },
          {
            title: this.getTitle('中上等', '身高>+1SD且≤+2SD为中上等（SD为标准差）'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, '中上等')
          },
          {
            title: this.getTitle('中等', '身高>-1SD且≤+1SD为中等（SD为标准差）'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, '中等')
          },
          {
            title: this.getTitle('中下等', '身高>-2SD且≤-1SD为中下等（SD为标准差）'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, '中下等')
          },
          {
            title: this.getTitle('下等', '身高≤-2SD为下等（SD为标准差）'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, '下等')
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
