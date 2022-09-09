import { Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  // 注册为子模块的组件需要注入的参数
  inject: {
    submoduleName: { default: 'paymentRecords' },
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
            title: '缴费时间',
            dataIndex: 'payEndTime'
          },
          {
            title: '缴费金额',
            dataIndex: 'amount'
          },
          {
            title: '收款人',
            dataIndex: 'operateName'
          },
          {
            title: '摘要',
            dataIndex: 'remark'
          }
          // {
          //   title: '状态',
          //   align: 'center',
          //   scopedSlots: { customRender: 'status' }
          // }
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
      if (this.currentItem.id) {
        return { id: this.currentItem.id }
      } else {
        return { id: this.$route.query.bid }
      }
    }
  },
  render() {
    const attruibutes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName, this.submoduleName)
      },
      attrs: {class: 'bnm-table-in-modal'}
    }

    return (
      <Table
        {...attruibutes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1
            // status: (text, record) => (
            //   <span style={{ color: ['#52c41a', '#faad14'][record.acceptStatus - 1] }}>
            //     {['已处理', '待处理'][record.acceptStatus - 1]}
            //   </span>
            // )
          }
        }}
      />
    )
  }
}
