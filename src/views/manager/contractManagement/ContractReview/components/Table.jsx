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
            width: 280,
            fixed: true,
            dataIndex: 'companyName'
          },
          {
            title: '类型',
            width: 120,
            dataIndex: 'signingTypeStr'
          },
          {
            title: '场地/期限',
            width: 120,
            // align: 'center',
            dataIndex: 'address'
          },

          {
            title: '签约人',
            // align: 'center',
            width: 120,
            dataIndex: 'signerName'
          },
          {
            title: '状态',
            align: 'center',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'signingStatus' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
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
    async onDetailsClick(record) {
      await this.$router.push({
        name: 'contractReviewDetails',
        query: { cid: record.id } // contractID
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
            signingStatus: (text, record) => (
              <span>{['签约中', '待审核', '已签约', '审核驳回'][+record.signingStatus - 1]}</span>
            ),
            operation: (text, record) => (
              <Space>
                <Button type="link" size="small" onClick={() => this.onDetailsClick(record)}>
                  签约详情
                </Button>
                {record.signingStatus === 2 ? (
                  <Button
                    type="link"
                    size="small"
                    onClick={() => this._setVisibleOfModal(record, 'visibleOfContractReview')}
                  >
                    审核
                  </Button>
                ) : null}
              </Space>
            )
          }
        }}
      />
    )
  }
}
