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
            title: '企业',
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
            scopedSlots: { customRender: 'address' }
          },
          {
            title: '签约期限',
            dataIndex: 'contractTime'
          },
          {
            title: '费用/优惠',
            scopedSlots: { customRender: 'amount' }
          },
          {
            title: '状态',
            width: 120,
            dataIndex: 'signingStatusStr'
          },
          {
            title: '签约合同',
            width: 140,
            align: 'center',
            scopedSlots: { customRender: 'contractUrl' }
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 230,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    async onReSignClick(record) {
      await this.$router.push({ name: 'signingProcess', query: { id: record.id } })
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
              return record.amount
                ? (
                  <div>
                    <div style={{ color: 'rgb(216, 38, 34' }}>{record.amount}</div>
                    <div>{record.saleAmount}</div>
                  </div>
                )
                : <div style={{ color: '#8c8c8c' }}>未核算费用</div>
            },
            contractUrl: (text, record) => (
              <a href={record.contractUrl} target="_blank">合同下载</a>
            ),
            address: (text, record) => (
              <ul style={{ paddingLeft: '20px', marginBottom: 0 }}>
                {
                  record.address.split(',').map(item => (
                    <li>{item}</li>
                  ))
                }
              </ul>
            ),
            operation: (text, record) => (
              <Space class="operation-space">
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onEditClick(record)}
                >
                  编辑
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onReSignClick(record)}
                >
                  重新签约
                </Button>
                <Button
                  type="link"
                  size="small"
                  // onClick={() => this.onEditClick(record)}
                >
                  续约
                </Button>
                <Button
                  type="link"
                  size="small"
                  // onClick={() => this.onEditClick(record)}
                >
                  解约
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
