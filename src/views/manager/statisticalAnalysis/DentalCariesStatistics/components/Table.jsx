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
        title: '龋齿',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 0)
      },
      {
        title: '龋均',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 1)
      },
      {
        title: '龋补',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 2)
      },
      {
        title: '乳龋患',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 3)
      },
      {
        title: '恒龋患',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 4)
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
        dataIndex: 'grade'
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
    }
  }
}
