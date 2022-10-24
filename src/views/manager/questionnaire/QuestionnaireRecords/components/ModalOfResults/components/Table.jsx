import '../index.scss'
import { Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import { mapGetters } from 'vuex'

export default {
  inject: ['submoduleName'],
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        size: 'middle',
        rowSelection: null,
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '标题',
            width: 150,
            dataIndex: 'itemName'
          },
          {
            title: '填写结果',
            dataIndex: 'resultContent'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    loading() {
      return this.getState('loading', this.moduleName, this.submoduleName)
    },
    list() {
      return this.getState('list', this.moduleName, this.submoduleName)
    },
    currentItem() {
      return this.getState('currentItem', this.moduleName)
    },
    // forTable内自动获取列表数据需要的参数
    additionalQueryParameters() {
      return { id: this.currentItem.id }
    }
  },
  render() {
    const attruibutes = {
      props: {
        ...this.tableProps,
        loading: this.loading
      },
      attrs: { class: 'bnm-table-in-modal' }
    }

    return (
      <Table
        {...attruibutes}
        {...{ scopedSlots: { serialNumber: (text, record, index) => index + 1 + this.serialNumber } }}
      />
    )
  }
}
