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
            title: '企业名称',
            dataIndex: 'companyName'
          },
          {
            title: '类型',
            dataIndex: 'signingTypeStr'
          },
          {
            title: '场地/期限',
            scopedSlots: { customRender: 'addressInfo' }
          },
          {
            title: '费用/优惠',
            scopedSlots: { customRender: 'saleAmount' }
          },
          {
            title: '签约人',
            dataIndex: 'signerName'
          },
          {
            title: '状态',
            align: 'center',
            width: 80,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '签约合同',
            scopedSlots: { customRender: 'contractUrl' }
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 150,
            scopedSlots: { customRender: 'operation' }
          }
        ],
        rowSelection: null
      }
    }
  },
  methods: {
    onDetailsClick(record) {
      this.$router.push({
        name: 'contractReviewDetails',
        query: {
          id: record.id
        }
      })
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
            serialNumber: (text, record, index) => {
              return <span>{index + 1}</span>
            },
            addressInfo: text => (
              <div>
                <span>{text.address}</span>
                <br />
                <span>{text.contractTime}</span>
              </div>
            ),
            saleAmount: text => (
              <div>
                <span style={{ color: 'red' }}>{text.amount}</span>
                <br />
                <span>{text.saleAmount}</span>
              </div>
            ),
            status: (text, record) => (
              <div>
                <span>{text.signingStatusStr}</span>
              </div>
            ),
            contractUrl: text => (
              <a href={text.contractUrl} target="_brank">
                预览合同
              </a>
            ),
            operation: text => (
              <Space class="operation-space">
                <Button type="link" size="small" onClick={() => this.onDetailsClick(text)}>
                  签约详情
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(text, 'visibleOfContractReview')}>
                  用印
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
