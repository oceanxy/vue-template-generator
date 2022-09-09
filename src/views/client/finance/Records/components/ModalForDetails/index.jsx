import { Button, Table } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import { dispatch } from '@/utils/store'

export default {
  mixins: [forModal()],
  data() {
    return {
      visibleField: 'showModalForDetails',
      modalProps: {
        width: 600,
        footer: <Button onClick={() => this.onCancel('showModalForDetails')}>关闭</Button>
      },
      tableProps: {
        columns: [
          {
            title: '月份',
            dataIndex: 'billMonth'
          },
          {
            title: '费用类型',
            dataIndex: ''
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
        dataSource: []
      }
    }
  },
  computed: {
    modalForDetailsLoading() {
      return this.$store.state[this.moduleName].modalForDetailsLoading
    },
    recordsDetailsList() {
      return this.$store.state[this.moduleName].recordsDetailsList
    },
    billList() {
      return this.recordsDetailsList?.billList || []
    }
  },
  watch: {
    async visible(value) {
      if (value) {
        dispatch(this.moduleName, 'getFinanceRecordsDetails')
      }
    }
  },
  render() {
    const attributes = {
      attrs: { ...this.modalProps },
      on: { cancel: () => this.onCancel('showModalForDetails') }
    }

    const tableAttributes = {
      attrs: { class: 'records-details-table bnm-table-in-modal' },
      props: {
        ...this.tableProps,
        loading: this.modalForDetailsLoading,
        dataSource: this.billList
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <Table
          {...tableAttributes}
          {...{
            scopedSlots: {
              operation: (text, record) => (
                <Button.Group>
                  <Button type="link" onClick={this.onViewDetailsClick}>
                    查看明细
                  </Button>
                  <Button type="link" onClick={() => this.onDelClick(record.id)}>
                    申请开票
                  </Button>
                </Button.Group>
              )
            }
          }}>
          <template slot="footer">
            <div class="receivable">
              <span>应收合计</span>
              <span>{this.recordsDetailsList.amount}</span>
            </div>
            <div class="actually-received">
              <span>实收金额</span>
              <span>{this.recordsDetailsList.realAmount}</span>
            </div>
          </template>
        </Table>
      </DragModal>
    )
  }
}
