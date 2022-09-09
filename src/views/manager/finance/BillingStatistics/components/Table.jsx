import '../assets/styles/index.scss'
import { Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import { mapGetters } from 'vuex'

export default {
  mixins: [forTable(true, false)],
  data() {
    return {
      tableProps: {
        rowKey: 'id',
        rowSelection: null,
        bordered: false,
        size: 'middle',
        columns: [
          {
            title: '',
            width: 100,
            dataIndex: 'itemName'
          },
          {
            title: '已结清',
            align: 'center',
            scopedSlots: { customRender: 'endAmount' }
          },
          {
            title: '欠缴',
            align: 'center',
            scopedSlots: { customRender: 'oweAmount' }
          },
          {
            title: '合计',
            align: 'center',
            scopedSlots: { customRender: 'totalAmount' }
          },
          {
            title: '占比',
            align: 'center',
            scopedSlots: { customRender: 'percent' }
          }
        ]
      },
      additionalQueryParameters: {}
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    tableYear() {
      return this.getState('tableYear', this.moduleName)
    }
  },
  watch: {
    async tableYear(value) {
      this.additionalQueryParameters.billDate = value
      await this.fetchList()
    }
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName)
      }
    }

    if (this.tableProps.dataSource.length) {
      attributes.props.dataSource = this.tableProps.dataSource.slice(0, this.tableProps.dataSource.length - 1)
    } else {
      attributes.props.dataSource = []
    }

    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...attributes}
        {...{
          scopedSlots: {
            endAmount: record => `${record.endAmount}元`,
            oweAmount: record => `${record.oweAmount}元`,
            totalAmount: record => `${record.totalAmount}元`,
            percent: record => `${record.percent}%`
          }
        }}
      />
    )
  }
}
