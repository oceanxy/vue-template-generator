import { Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import { mapGetters } from 'vuex'

export default {
  // 注册为子模块的组件需要注入的参数
  inject: {
    submoduleName: { default: 'bills' },
    visibleField: { default: '' }
  },
  mixins: [forTable()],
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
            title: '账单',
            dataIndex: 'itemName'
          },
          {
            title: '出账日',
            dataIndex: 'billStarDateStr'
          },
          {
            title: '账单金额',
            dataIndex: 'itemAmount'
          },
          {
            title: '状态',
            align: 'center',
            dataIndex: 'payStatusStr'
          }
        ],
        rowSelection: null,
        tableLayout: 'fixed',
        size: 'middle'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    currentItem() {
      return this.getState('currentItem', this.moduleName)
    },
    additionalQueryParameters() {
      if (this.currentItem.id) {
        return { id: this.currentItem.id }
      } else {
        return { id: this.$route.query.bid }
      }
    },
    loading() {
      return this.getState('loading', this.moduleName, this.submoduleName)
    }
  },
  render() {
    const attruibutes = {
      props: {
        ...this.tableProps,
        loading: this.loading
      },
      attrs: { class: 'tg-table-in-modal' }
    }

    return (
      <Table
        {...attruibutes}
        {...{ scopedSlots: { serialNumber: (text, record, index) => index + 1 + this.serialNumber } }}
      />
    )
  }
}
