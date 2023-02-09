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
        title: 'P3',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 'P3')
      },
      {
        title: 'P5',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 'P5')
      },
      {
        title: 'P10',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 'P10')
      },
      {
        title: 'P25',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 'P25')
      },
      {
        title: 'P50',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 'P50')
      },
      {
        title: 'P75',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 'P75')
      },
      {
        title: 'P90',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 'P90')
      },
      {
        title: 'P95',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 'P95')
      },
      {
        title: 'P97',
        align: 'center',
        customRender: (text, record) => this.getLevelData(text, record, 'P97')
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
      const data = record.levelList?.find(item => item.percentileNum === columnName) ?? {}

      return data.percentileValue
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
