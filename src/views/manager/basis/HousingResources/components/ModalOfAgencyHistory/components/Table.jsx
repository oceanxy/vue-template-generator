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
            dataIndex: ''
          },
          {
            title: '签约企业',
            dataIndex: 'h'
          },
          {
            title: '签约日期',
            dataIndex: 'appName'
          },
          {
            title: '解约日期',
            dataIndex: 'remark'
          },
          {
            title: '周期（月）',
            align: 'center',
            dataIndex: 'zz'
          },
          {
            title: '状态',
            align: 'center',
            width: 60,
            scopedSlots: { customRender: 'status' }
          }
        ],
        class: 'modal-of-agency-history'
      }
    }
  },
  methods: {
    async onAgencyHistoryClick(record) {
      await this.setVisibleOfModal(record, 'visibleOfAgencyHistory')
    }
  },
  render() {
    const attruibutes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName)
      },
      attrs: {
        class: 'modal-of-agency-history'
      }
    }

    return (
      <Table
        {...attruibutes}
        {...{
          scopedSlots: {
            // status: (text, record) => (
            //   <Switch
            //     checked={+record.status === 1}
            //     onChange={checked => this.onStatusChange(checked, record)}
            //   />
            // )
          }
        }}
      />
    )
  }
}
