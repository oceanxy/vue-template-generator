import forTable from '@/mixins/forTable'
import { Icon, Tooltip } from 'ant-design-vue'

export default {
  mixins: [forTable({ isFetchList: false })],
  props: {
    type: {
      type: Number,
      required: true
    }
  },
  computed: {
    list() {
      return this.getState('list', this.moduleName)
    }
  },
  data() {
    const columns = [
      {
        title: '序号',
        width: 70,
        align: 'center',
        fixed: true,
        scopedSlots: { customRender: 'serialNumber' }
      },
      {
        title: this.getTitle('总人数', '参与体检的学生总数'),
        width: 100,
        align: 'center',
        dataIndex: 'stuNum'
      },
      {
        title: '正常',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, '正常')
      },
      {
        title: '近视',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, '近视')
      },
      {
        title: '视力不良',
        children: [
          {
            title: this.getTitle('轻度低下', '视力≥4.9 且 视力<5.0'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, '轻度低下')
          },
          {
            title: this.getTitle('中度低下', '视力≥4.6 且 视力≤4.8'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, '中度低下')
          },
          {
            title: this.getTitle('高度低下', '视力≤4.5'),
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, '高度低下')
          },
          {
            title: '合计',
            align: 'center',
            customRender: (text, record) => this.getLevelData(text, record, '合计')
          }
        ]
      }
    ]

    if (this.type === 1) {
      columns.splice(1, 0, {
        title: '年龄',
        width: 100,
        align: 'center',
        dataIndex: 'age'
      })
    } else {
      columns.splice(1, 0, {
        title: '年级',
        width: 100,
        align: 'center',
        dataIndex: 'gradeStr'
      })
    }

    return {
      tableProps: {
        columns,
        rowSelection: null
      }
    }
  },
  watch: {
    list: {
      deep: true,
      handler(value) {
        this.tableProps.dataSource = value
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
