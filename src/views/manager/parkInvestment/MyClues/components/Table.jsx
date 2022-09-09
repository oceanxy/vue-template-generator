import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        rowSelection: null,
        columns: [
          {
            title: '序号',
            width: 60,
            fixed: true,
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '线索标题',
            width: 160,
            fixed: true,
            dataIndex: 'title'
          },
          {
            title: '来源',
            width: 120,
            dataIndex: 'cluesResource'
          },
          {
            title: '所属行业',
            width: 100,
            dataIndex: 'industry'
          },
          {
            title: '采集人/时间',
            width: 140,
            scopedSlots: { customRender: 'gatherName' }
          },
          // {
          //   title: '跟进团队/成员',
          //   width: 120,
          //   dataIndex: 'memberName'
          // },
          {
            title: '最新进展/更新时间',
            width: 140,
            scopedSlots: { customRender: 'processDescription' }
          },
          {
            title: '状态',
            width: 120,
            fixed: 'right',
            dataIndex: 'allotStatusStr'
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 240,
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
            serialNumber: (text, record, index) => index + 1,
            gatherName: (text, record) => (
              <div>
                <div>{record.gatherName}</div>
                <div>{record.gatherTimeStr}</div>
              </div>
            ),
            processDescription: (text, record) => (
              <div>
                <div style={{ fontWeight: 'bolder' }}>已跟进负责人</div>
                <div>{record.processDescription}</div>
              </div>
            ),
            operation: (text, record) => (
              <Space>
                {
                  record.allotStatus === 2 ? [
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this._setVisibleOfModal(record, 'visibleOfFollowUpClues')}
                    >
                      跟进
                    </Button>,
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this.$router.push({
                        name: 'signingProcess', query: { cluesId: record.id }
                      })}
                    >
                      签约
                    </Button>
                  ] : null
                }
                {
                  record.allotStatus === 5 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this._setVisibleOfModal(record, 'visibleOfFollowUpClues')}
                    >
                      重新跟进
                    </Button>
                  ) : null
                }
                {
                  record.allotStatus === 3 || record.allotStatus === 4 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this._setVisibleOfModal(record, 'visibleOfDetails')}
                    >
                      查看详情
                    </Button>
                  ) : null
                }
              </Space>
            )
          }
        }}
      />
    )
  }
}
