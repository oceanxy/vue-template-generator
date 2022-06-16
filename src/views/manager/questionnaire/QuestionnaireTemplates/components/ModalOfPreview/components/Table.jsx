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
            title: '标题',
            dataIndex: 'h'
          },
          {
            title: '数据',
            dataIndex: 'appName'
          },
          {
            title: '类型',
            dataIndex: 'remark'
          },
          {
            title: '选项',
            dataIndex: 'remark1'
          }
        ],
        class: 'modal-of-agency-history'
      }
    }
  },
  methods: {
    async onAgencyHistoryClick(record) {
      await this._setVisibleOfModal(record, 'visibleOfAgencyHistory')
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
