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
            title: '时间',
            dataIndex: ''
          },
          {
            title: '类型',
            dataIndex: 'h'
          },
          {
            title: '摘要',
            dataIndex: 'appName'
          },
          {
            title: '经办人',
            dataIndex: 'remark'
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
