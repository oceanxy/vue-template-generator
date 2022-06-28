import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            scopedSlots: { customRender: 'index' }
          },
          {
            title: '团队',
            dataIndex: 'teamName'
          },
          {
            title: '成员',
            dataIndex: 'memberName'
          },
          {
            title: '分配线索',
            width: 80,
            dataIndex: 'cluesCount'
          },
          {
            title: '跟进中',
            align: 'center',
            width: 60,
            dataIndex: 'followCluesCount'
          },
          {
            title: '已结束',
            align: 'center',
            width: 60,
            dataIndex: 'endCluesCount'
          },
          {
            title: '签约中',
            align: 'center',
            width: 60,
            dataIndex: 'signingCluesCount'
          },
          {
            title: '已签约',
            align: 'center',
            width: 60,
            dataIndex: 'endSigningCluesCount'
          },
          {
            title: '转化率',
            align: 'center',
            width: 60,
            dataIndex: 'conversionRate'
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'operation' }
          }
        ],
        rowSelection: null
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
            index: (text, record, index) => <span>{index + 1}</span>,
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
                  onClick={() =>
                    this.downExcel({ teamId: record.id, teamName: record.teamName }, `${record.teamName}-团队任务统计`)
                  }>
                  导出数据
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
