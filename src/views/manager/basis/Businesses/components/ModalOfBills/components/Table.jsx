import { Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  // 注册为子模块的组件需要注入的参数
  inject: ['submoduleName', 'visibleField'],
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
    currentItem() {
      return this.getCurrentItem(this.moduleName)
    },
    additionalQueryParameters() {
      return {
        id: this.currentItem.id
      }
    }
  },
  render() {
    const attruibutes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName, this.submoduleName)
      },
      attrs: {
        class: 'bnm-table-in-modal'
      }
    }

    return (
      <Table
        {...attruibutes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1
          }
        }}
      />
    )
  }
}
