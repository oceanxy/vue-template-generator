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
        title: '收缩压',
        children: [
          {
            title: '平均值',
            align: 'center',
            width: 100,
            dataIndex: 'avgSystolicStr'
          },
          {
            title: '标准差',
            align: 'center',
            width: 100,
            dataIndex: 'systolicStdStr'
          }
        ]
      },
      {
        title: '舒张压',
        children: [
          {
            title: '平均值',
            align: 'center',
            width: 100,
            dataIndex: 'avgDiastolicStr'
          },
          {
            title: '标准差',
            align: 'center',
            width: 100,
            dataIndex: 'diastolicStdStr'
          }
        ]
      },
      {
        title: this.getTitle('正常血压', '收缩压和舒张压<同性别、同年龄、同身高百分位血压 P90'),
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 0)
      },
      {
        title: this.getTitle(
          '正常高值血压',
          '收缩压和舒张压≥同性别、同年龄、同身高百分位血压 P90 且 收缩压和舒张压<同性别、同年龄、同身高百分位血压 P95'
        ),
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 1)
      },
      {
        title: this.getTitle('血压偏高', '收缩压和舒张压≥同性别、同年龄、同身高百分位血压 P95'),
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 2)
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
