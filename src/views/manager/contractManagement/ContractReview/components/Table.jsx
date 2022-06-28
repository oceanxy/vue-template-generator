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
            // align: 'center',
            dataIndex: 'address'
          },

          {
            title: '签约人',
            // align: 'center',
            dataIndex: 'signerName'
          },
          {
            title: '状态',
            align: 'center',
            width: 60,
            scopedSlots: { customRender: 'signingStatus' }
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
            signingStatus: (text, record) => (
              <span>{['签约中', '待审核', '已签约', '审核驳回'][+record.signingStatus - 1]}</span>
            ),
            operation: (text, record) => (
              <Space class="operation-space">
                <Button type="link" size="small" onClick={() => this.onDetailsClick(record)}>
                  签约详情
                </Button>
                {record.signingStatus === 2 ? (
                  <Button
                    type="link"
                    size="small"
                    onClick={() => this._setVisibleOfModal(record, 'visibleOfContractReview')}>
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
