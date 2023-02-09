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
        title: this.getTitle('平均值', '对应所有学生身高/学生总数'),
        align: 'center',
        width: 100,
        dataIndex: 'avgValueStr'
      },
      {
        title: this.getTitle('标准差', '方差的算术平方根'),
        align: 'center',
        width: 100,
        dataIndex: 'std'
      },
      {
        title: '优秀',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, '优秀')
      },
      {
        title: '良好',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, '良好')
      },
      {
        title: '及格',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, '及格')
      },
      {
        title: '不及格',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, '不及格')
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
        rowSelection: null,
        size: 'small'
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
