import { Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  // 注册为子模块的组件需要注入的参数
  inject: {
    submoduleName: { default: 'suggestions' },
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
            title: '提交时间',
            dataIndex: 'complaintTimeStr'
          },
          {
            title: '类型',
            dataIndex: 'complaintTypeStr'
          },
          {
            title: '详情',
            dataIndex: 'content'
          },
          {
            title: '状态',
            align: 'center',
            width: 80,
            dataIndex: 'acceptStatusStr'
          },
          {
            title: '处理人',
            align: 'center',
            dataIndex: 'assigneeName'
          },
          {
            title: '处理时间',
            align: 'center',
            dataIndex: 'acceptTimeStr'
          },
          {
            title: '处理结果',
            align: 'center',
            dataIndex: 'acceptResult'
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
      attrs: { class: 'tg-table-in-modal' }
    }

    return (
      <Table
        {...attruibutes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1 + this.serialNumber,
            acceptStatus: (text, record) => (
              <span style={{ color: ['#52c41a', '#faad14'][record.acceptStatus - 1] }}>
                {['已处理', '待处理'][record.acceptStatus - 1]}
              </span>
            )
          }
        }}
      />
    )
  }
}
