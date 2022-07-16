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
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '申请时间',
            width: 160,
            dataIndex: 'applyTimeStr'
          },
          {
            title: '申请企业',
            dataIndex: 'companyName'
          },
          {
            title: '签约场地',
            scopedSlots: { customRender: 'address' }
          },
          {
            title: '续约模式',
            width: 120,
            dataIndex: 'renewalTypeStr'
          },
          {
            title: '费用核算',
            width: 120,
            dataIndex: 'accountingTypeStr'
          },
          {
            title: '审核状态',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'auditStatus' }
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 120,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    async toRenewContract(record) {
      await this.$router.push({ name: 'signingProcess', query: { id: record.contractId } })
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
            address: (text, record) => (
              <ul style={{ paddingLeft: '20px', marginBottom: 0 }}>
                {
                  record.address?.split(',').map(item => (
                    <li>{item}</li>
                  ))
                }
              </ul>
            ),
            auditStatus: (text, record) => ['待审核', '审核通过', '审核失败'][+record.auditStatus - 2],
            operation: (text, record) => (
              <Space class="operation-space">
                {
                  record.auditStatus === 2 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this._setVisibleOfModal(record, 'visibleOfReview')}
                    >
                      审核申请
                    </Button>
                  ) : null
                }
                {
                  record.auditStatus === 3 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this.toRenewContract(record)}
                    >
                      前往续约
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
