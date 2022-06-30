import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            dataIndex: ''
          },
          {
            title: '线索标题',
            dataIndex: 'appName'
          },
          {
            title: '来源',
            dataIndex: 'remark'
          },
          {
            title: '所属行业',
            align: 'center',
            dataIndex: 'zz'
          },
          {
            title: '采集人/时间',
            align: 'center',
            dataIndex: 'xx'
          },
          {
            title: '跟进团队/成员',
            align: 'center',
            dataIndex: 'cc'
          },
          {
            title: '最新进展/更新时间',
            align: 'center',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '状态',
            align: 'center',
            width: 60,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 300,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {},
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName)
      }
    }

    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...attributes}
        {...{
          scopedSlots: {
            // status: (text, record) => (
            //   <Switch
            //     checked={+record.status === 1}
            //     onChange={checked => this.onStatusChange(checked, record)}
            //   />
            // ),
            operation: (text, record) => (
              <Space class="operation-space">
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfFollowUpClues')}
                >
                  跟进
                </Button>
                <Button
                  type="link"
                  size="small"
                  // onClick={() => this.onEditClick(record)}
                >
                  签约
                </Button>
                <Button
                  type="link"
                  size="small"
                  // onClick={() => this.onEditClick(record)}
                >
                  重新跟进
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfDetails', 'clues')}
                >
                  查看详情
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
