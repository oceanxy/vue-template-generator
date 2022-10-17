import '../index.scss'
import { Table } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
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
            title: '标题',
            dataIndex: 'fullName'
          },
          {
            title: '组件类型',
            width: 120,
            dataIndex: 'modTypeStr'
          },
          {
            title: '选项',
            scopedSlots: { customRender: 'itemOptionList' }
          }
        ],
        rowSelection: null,
        size: 'middle',
        rowKey: 'id',
        tableLayout: 'fixed',
        dataSource: [],
        pagination: false
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    loading() {
      return this.getState('loading', this.moduleName)
    },
    itemList() {
      return this.getState('details', this.moduleName)?.itemList ?? []
    }
  },
  render() {
    const attruibutes = {
      props: {
        ...this.tableProps,
        dataSource: this.itemList,
        loading: this.loading
      },
      attrs: { class: 'bnm-table-in-modal' }
    }

    return (
      <Table
        {...attruibutes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1,
            itemOptionList: (text, record) => (
              <ol style={{ paddingLeft: '20px', marginBottom: 0 }}>
                {
                  record.itemOptionList.map(item => (
                    <li>{item.optionValue}</li>
                  ))
                }
              </ol>
            )
          }
        }}
      />
    )
  }
}
