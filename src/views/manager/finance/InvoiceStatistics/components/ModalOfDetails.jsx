import '../assets/styles/index.scss'
import { Table } from 'ant-design-vue'
import forTableModal from '@/mixins/forModal/forTableModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default {
  mixins: [forTableModal()],
  data() {
    return {
      visibleField: 'visibleOfDetails',
      tableProps: {
        columns: [
          {
            title: '序号',
            align: 'center',
            width: 60,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '开票时间',
            dataIndex: 'payEndTime'
          },
          {
            title: '交易流水号',
            dataIndex: 'paySerialNumber'
          },
          {
            title: '经办人',
            dataIndex: 'operateName'
          },
          {
            title: '金额',
            dataIndex: 'amount'
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
    details() {
      return this.getState('details', this.moduleName)
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListForSelect', {
            moduleName: this.moduleName,
            stateName: 'details',
            customApiName: 'getDetailsOfInvoiceStatistics',
            payload: { companyId: this.currentItem.companyId }
          })
        }
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: { cancel: () => this.onCancel('visibleOfDetails') }
    }

    const tableAttributes = {
      props: {
        ...this.tableProps,
        loading: this.details.loading,
        dataSource: this.details.list
      },
      attrs: { class: 'bnm-table-in-modal' }
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <Table
          {...tableAttributes}
          {...{ scopedSlots: { serialNumber: (text, record, index) => index + 1 + this.serialNumber } }}
        />
      </DragModal>
    )
  }
}
