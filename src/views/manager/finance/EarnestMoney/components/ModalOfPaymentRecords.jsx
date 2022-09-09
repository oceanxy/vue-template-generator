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
            title: '时间',
            dataIndex: 'createTime'
          },
          {
            title: '金额',
            dataIndex: 'amount'
          },
          {
            title: '类型',
            dataIndex: 'logTypeStr'
          },
          {
            title: '经办人',
            dataIndex: 'operateName'
          },
          {
            title: '支付方式',
            dataIndex: 'payTypeStr'
          },
          {
            title: '交易流水',
            dataIndex: 'serialNumber'
          },
          {
            title: '备注',
            dataIndex: 'remark'
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
      handler(value) {
        if (value) {
          this.$store.dispatch('getListForSelect', {
            moduleName: this.moduleName,
            stateName: 'paymentRecordsList',
            customApiName: 'getDetailsOfEarnestMoney',
            payload: {id: this.currentItem.id}
          })
        }
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {cancel: () => this.onCancel(this.visibleField)}
    }

    const tableAttributes = {
      props: {
        ...this.tableProps,
        loading: this.paymentRecordsList.loading,
        dataSource: this.paymentRecordsList.list
      },
      attrs: {class: 'bnm-table-in-modal'}
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <Table
          {...tableAttributes}
          {...{scopedSlots: {sNumber: (text, record, index) => index + 1}}}
        />
      </DragModal>
    )
  }
}
