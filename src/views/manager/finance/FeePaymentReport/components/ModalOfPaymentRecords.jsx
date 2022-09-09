import forTableModal from '@/mixins/forModal/forTableModal'
import DragModal from '@/components/DragModal'
import { Table } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  mixins: [forTableModal()],
  data() {
    return {
      // 此字段与 store 里的同名字段必须保持一致，用于控制该弹窗的可见性，默认值为 modal mixin 里的 visibleField 的值
      visibleField: 'visibleOfPaymentRecords',
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            scopedSlots: { customRender: 'sNumber' }
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
            dataIndex: 'amount'
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
    paymentRecordsList() {
      return this.getState('paymentRecordsList', this.moduleName)
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListForSelect', {
            moduleName: this.moduleName,
            stateName: 'paymentRecordsList',
            customApiName: 'getDetailsOfFeePaymentReport',
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
        loading: this.paymentRecordsList.loading,
        dataSource: this.paymentRecordsList.data.list
      },
      attrs: { class: 'bnm-table-in-modal records-details-table' }
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <Table
          {...tableAttributes}
          {...{ scopedSlots: { sNumber: (text, record, index) => index + 1 } }}
        >
          <template slot="footer">
            <div class="receivable">
              <span>应收合计</span>
              <span>{this.paymentRecordsList.data.amount}</span>
            </div>
            <div class="actually-received">
              <span>实收金额</span>
              <span>{this.paymentRecordsList.data.realAmount}</span>
            </div>
          </template>
        </Table>
      </DragModal>
    )
  }
}
