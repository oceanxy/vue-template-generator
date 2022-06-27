import '../index.scss'
import { Table } from 'ant-design-vue'
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
            title: '签约企业',
            dataIndex: 'companyName'
          },
          {
            title: '签约日期',
            dataIndex: 'signingTimeStr'
          },
          {
            title: '解约日期',
            dataIndex: 'removeTimeStr'
          },
          {
            title: '周期（月）',
            align: 'center',
            dataIndex: 'durationMonth'
          },
          {
            title: '状态',
            align: 'center',
            width: 80,
            scopedSlots: { customRender: 'signingStatus' }
          }
        ],
        class: 'modal-of-agency-history',
        rowSelection: null,
        tableLayout: 'fixed',
        size: 'middle'
      }
    }
  },
  methods: {
    async onContractHistoryClick(record) {
      await this._setVisibleOfModal(record, 'visibleOfContractHistory')
    }
  },
  render() {
    const attruibutes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName)
      },
      attrs: {
        class: 'modal-of-contract-history-table'
      }
    }

    return (
      <Table
        {...attruibutes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1,
            signingStatus: (text, record) => (
              <span style={{ color: ['#52c41a', '#faad14'][record.signingStatus - 1] }}>
                {record.signingStatus}
              </span>
            )
          }
        }}
      />
    )
  }
}
