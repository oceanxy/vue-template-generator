import { Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import { mapGetters } from 'vuex'

export default {
  inject: ['submoduleName', 'visibleField'],
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        size: 'middle',
        columns: [
          {
            title: '时间',
            width: 140,
            dataIndex: 'progressTime'
          },
          {
            title: '类型',
            width: 120,
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
        tableLayout: 'fixed'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    // 请求线索详情列表需要的参数（在 forTable 混合内通过全局action：getList 请求数据）
    additionalQueryParameters() {
      return { id: this.getState('currentItem', this.moduleName).id }
    }
  },
  render() {
    const attruibutes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName, this.submoduleName)
      },
      attrs: { class: 'bnm-table-in-modal' }
    }

    return (
      <Table {...attruibutes} />
    )
  }
}
