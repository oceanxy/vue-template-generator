import '../index.scss'
import { Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  inject: ['submoduleName', 'visibleField'],
  mixins: [forTable],
  data() {
    return {
      tableProps: {
        size: 'middle',
        columns: [
          {
            title: '时间',
            dataIndex: 'progressTime'
          },
          {
            title: '类型',
            dataIndex: 'progressType'
          },
          {
            title: '摘要',
            dataIndex: 'description'
          },
          {
            title: '经办人',
            dataIndex: 'memberInfo'
          }
        ],
        rowSelection: null,
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
