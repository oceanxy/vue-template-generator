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
            title: '企业名称',
            width: 200,
            fixed: true,
            dataIndex: 'companyName'
          },
          {
            title: '类型',
            width: 120,
            align: 'center',
            dataIndex: 'signingTypeStr'
          },
          {
            title: '场地',
            width: 120,
            scopedSlots: { customRender: 'address' }
          },
          {
            title: '期限',
            width: 180,
            dataIndex: 'contractTime'
          },
          {
            title: '费用/优惠',
            width: 200,
            scopedSlots: { customRender: 'saleAmount' }
          },
          {
            title: '签约人',
            width: 120,
            align: 'center',
            dataIndex: 'signerName'
          },
          {
            title: '状态',
            align: 'center',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '签约合同',
            align: 'center',
            width: 90,
            fixed: 'right',
            scopedSlots: { customRender: 'contractUrl' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 140,
            scopedSlots: { customRender: 'operation' }
          }
        ],
        rowSelection: null
      }
    }
  },
  methods: {
    async onDetailsClick(record) {
      await this.$router.push({
        name: 'contractHistoryDetails',
        query: { cid: record.id }
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
            address: (text, record) => (
              <ul
                style={{
                  paddingLeft: '20px',
                  marginBottom: 0
                }}
              >
                {
                  record.address
                    ? record.address.split(',').map(item => <li>{item}</li>)
                    : '-'
                }
              </ul>
            ),
            saleAmount: (text, record) => (
              <div>
                <ul style={{ paddingLeft: '20px', marginBottom: 0 }}>
                  {
                    record.amount?.split('，').map(item => (
                      <li>{item}</li>
                    ))
                  }
                  <li style={{ color: '#1890ff' }}>{record.saleAmount}</li>
                </ul>
              </div>
            ),
            status: (text, record) => record.signingStatusStr,
            contractUrl: text => text.signingStatus !== 1 && text.contractUrl ? (
              <a
                href={text.contractUrl}
                target="_brank"
              >
                预览合同
              </a>
            ) : '-',
            operation: (text, record) => (
              <Space>
                {
                  record.signingStatus !== 1
                    ? (
                      <Button
                        type="link"
                        size="small"
                        onClick={() => this.onDetailsClick(record)}
                      >
                        签约详情
                      </Button>
                    ) : null
                }
                {/*<Button*/}
                {/*  type="link"*/}
                {/*  size="small"*/}
                {/*  onClick={() => this._setVisibleOfModal(text, 'visibleOfContractReview')}*/}
                {/*>*/}
                {/*  用印*/}
                {/*</Button>*/}
              </Space>
            )
          }
        }}
      />
    )
  }
}
