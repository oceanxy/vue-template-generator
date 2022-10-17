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
            width: 60,
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '企业',
            width: 200,
            dataIndex: 'companyName'
          },
          {
            title: '签约类型',
            width: 120,
            align: 'center',
            dataIndex: 'signingTypeStr'
          },
          {
            title: '签约场地',
            width: 180,
            scopedSlots: { customRender: 'address' }
          },
          {
            title: '签约期限',
            width: 180,
            dataIndex: 'contractTime'
          },
          {
            title: '费用/优惠',
            width: 120,
            scopedSlots: { customRender: 'amount' }
          },
          {
            title: '状态',
            width: 150,
            fixed: 'right',
            scopedSlots: { customRender: 'signingStatus' }
          },
          {
            title: '签约合同',
            width: 140,
            fixed: 'right',
            align: 'center',
            scopedSlots: { customRender: 'contractUrl' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 250,
            scopedSlots: { customRender: 'operation' }
          }
        ],
        rowSelection: null
      }
    }
  },
  methods: {
    async onReSignClick(record, action) {
      await this.$router.push({ name: 'signingProcess', query: { id: record.id, ac: action } })
    }
  },
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
            amount: (text, record) => {
              return record.signingStatus === 2 || record.signingStatus === 3
                ? (
                  <div>
                    <div style={{ color: 'rgb(216, 38, 34' }}>{record.amount}</div>
                    <div>{record.saleAmount}</div>
                  </div>
                )
                : <div style={{ color: '#8c8c8c' }}>未核算费用</div>
            },
            contractUrl: (text, record) => (
              record.contractUrl ? (
                <a
                  href={record.contractUrl}
                  target="_blank"
                >
                  合同下载
                </a>
              ) : '-'
            ),
            signingStatus: (text, record) => `${record.signingStatusStr}（${record.signingStage}/4）`,
            address: (text, record) => (
              <ul
                style={{
                  paddingLeft: '20px',
                  marginBottom: 0
                }}
              >
                {
                  record.address?.split(',').map(item => (
                    <li>{item}</li>
                  ))
                }
              </ul>
            ),
            operation: (text, record) => (
              <Space>
                {
                  record.signingStatus === 2 || record.signingStatus === 3 || record.signingStatus === 4 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this.onReSignClick(record)}
                    >
                      查看结果
                    </Button>
                  ) : null
                }
                {
                  record.signingStatus === 1 || record.signingStatus === 2 || record.signingStatus === 4 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this.onReSignClick(record, 1)}
                    >
                      重新签约
                    </Button>
                  ) : null
                }
                {
                  record.signingStatus === 3 || record.signingStatus === 9
                    ? (
                      <Button
                        type="link"
                        size="small"
                        onClick={() => this._setVisibleOfModal(record, 'visibleOfRenew')}
                      >
                        续约
                      </Button>
                    )
                    : null
                }
                {
                  record.signingStatus === 3
                    ? (
                      <Button
                        type="link"
                        size="small"
                        onClick={() => this._setVisibleOfModal(record, 'visibleOfTerminate')}
                      >
                        解约
                      </Button>
                    )
                    : null
                }
                {
                  record.signingStatus === 1 || record.signingStatus === 2
                    ? (
                      <Button
                        type="link"
                        size="small"
                        onClick={() => this.onDeleteClick(record)}
                      >
                        删除
                      </Button>
                    )
                    : null
                }
              </Space>
            )
          }
        }}
      />
    )
  }
}
