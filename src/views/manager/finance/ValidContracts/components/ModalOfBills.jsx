import forTableModal from '@/mixins/forModal/forTableModal'
import DragModal from '@/components/DragModal'
import { Table } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  mixins: [forTableModal()],
  data() {
    return {
      // 此字段与 store 里的同名字段必须保持一致，用于控制该弹窗的可见性，默认值为 modal mixin 里的 visibleField 的值
      visibleField: 'visibleOfBills',
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '月份',
            dataIndex: 'billMonth'
          },
          {
            title: '费用类型',
            dataIndex: 'itemName'
          },
          {
            title: '明细',
            dataIndex: 'detailDesc'
          },
          {
            title: '金额',
            width: 100,
            dataIndex: 'amount'
          },
          {
            title: '状态',
            width: 100,
            scopedSlots: { customRender: 'payStatus' }
          }
        ],
        rowKey: 'id',
        tableLayout: 'fixed',
        dataSource: [],
        pagination: false,
        scroll: {},
        size: 'middle'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    pendingOrderList() {
      return this.getState('pendingOrderList', this.moduleName)
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        if (value) {
          this.$store.dispatch('getListForSelect', {
            moduleName: this.moduleName,
            stateName: 'pendingOrderList',
            customApiName: 'getListOfPendingOrder',
            payload: { id: this.currentItem.id }
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
        loading: this.pendingOrderList.loading,
        dataSource: this.pendingOrderList.list
      },
      attrs: { class: 'bnm-table-in-modal' }
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <Table
          {...tableAttributes}
          {...{
            scopedSlots: {
              serialNumber: (text, record, index) => index + 1 + this.serialNumber,
              payStatus: (text, record) => (
                <span style={{ fontWeight: 'bolder' }}>{record.payStatusStr}</span>
              )
            }
          }}
        />
      </DragModal>
    )
  }
}
