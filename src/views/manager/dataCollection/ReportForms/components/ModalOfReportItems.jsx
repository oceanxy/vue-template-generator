import forTableModal from '@/mixins/forModal/forTableModal'
import DragModal from '@/components/DragModal'
import { Table } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  mixins: [forTableModal()],
  data() {
    return {
      // 此字段与 store 里的同名字段必须保持一致，用于控制该弹窗的可见性，默认值为 modal mixin 里的 visibleField 的值
      visibleField: 'visibleOfReportItems',
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            dataIndex: 'serialNum'
          },
          {
            title: '标题',
            dataIndex: 'fullName'
          },
          {
            title: '类型',
            dataIndex: 'itemTypeStr'
          },
          {
            title: '组件类型',
            dataIndex: 'modTypeStr'
          },
          {
            title: '选项',
            scopedSlots: { customRender: 'itemOptionList' }
          }
        ],
        rowKey: 'id',
        tableLayout: 'fixed',
        dataSource: [],
        pagination: false,
        scroll: {},
        loading: false,
        size: 'middle'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    currentItem() {
      return this.getState('currentItem', this.moduleName)
    },
    targetItems() {
      return this.getState('targetItems', this.moduleName)
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListForSelect', {
            moduleName: this.moduleName,
            customApiName: 'getReportItems',
            stateName: 'targetItems',
            payload: { reportId: this.currentItem.id }
          })
        }
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: { cancel: () => this.onCancel(this.visibleField) }
    }

    const tableAttributes = {
      props: {
        ...this.tableProps,
        loading: this.targetItems.loading,
        dataSource: this.targetItems.list
      },
      attrs: { class: 'bnm-table-in-modal' }
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <Table
          {...tableAttributes}
          {...{
            scopedSlots: {
              itemOptionList: (text, record) => record.modType < 3
                ? (
                  <ul
                    style={{
                      paddingLeft: '20px',
                      marginBottom: 0
                    }}
                  >
                    {
                      record.itemOptionList.map(item => (
                        <li>{item.optionValue}（{item.score}分）</li>
                      ))
                    }
                  </ul>
                )
                : '-'
            }
          }}
        />
      </DragModal>
    )
  }
}
