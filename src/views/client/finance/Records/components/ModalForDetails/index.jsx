import './index.scss'
import { Button, Table, Spin } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import { dispatch } from '@/utils/store'

export default {
  props: {
    /**
     * 标题（可定义占位符）
     * “{action}” 为占位符，稍后会在 mixin 中替换为对应的字符，比如“新增”、“编辑”
     */
    modalTitle: {
      type: String,
      default: '{action}'
    }
  },
  mixins: [forModal()],
  data() {
    return {
      visibleField: 'showModalForDetails',
      modalProps: {
        width: 600,
        footer: <Button onClick={() => this.onCancel('showModalForDetails')}>关闭</Button>
      },
      columns: [
        {
          title: '月份',
          dataIndex: 'billMonth'
        },
        {
          title: '费用类型'
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
      dataSource: [{}]
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
      attrs: {
        ...this.modalProps
      },
      on: {
        cancel: () => this.onCancel('showModalForDetails')
      }
    }

    return (
      <DragModal {...attributes}>
        <Table
          columns={this.columns}
          dataSource={this.billList}
          rowKey="id"
          pagination={false}
          class="records-details-table"
          loading={this.modalForDetailsLoading}
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
