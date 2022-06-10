import './index.scss'
import { Button, Table } from 'ant-design-vue'
import { mapState } from 'vuex'
import modal from '@/mixins/modal'
import DragModal from '@/components/DragModal'

export default {
  mixins: [modal],
  data() {
    return {
      modalProps: {
        title: '缴费明细',
        width: 520,
        footer: <Button onClick={() => this.onCancel('setVisibleForDetails')}>关闭</Button>
      },
      columns: [
        {
          title: '月份',
          scopedSlots: { customRender: 'allPath' }
        },
        {
          title: '费用类型',
          scopedSlots: { customRender: 'remark' }
        },
        {
          title: '明细',
          scopedSlots: { customRender: 'remark' }
        },
        {
          title: '金额',
          scopedSlots: { customRender: 'remark' }
        }
      ],
      dataSource: [
        {}
      ]
    }
  },
  computed: {
    ...mapState({
      allSiteApps: 'allSiteApps',
      allFunctionalModules: 'allFunctionalModules'
    })
  },
  watch: {
    async visible(value) {
      if (value) {
        await this.$store.dispatch('getAllFunctionalModules')
      }
    }
  },
  render() {
    const attributes = {
      attrs: {
        ...this.modalProps,
        visible: this.getVisible('visibleForDetails') || this.modalProps.visible
      },
      on: {
        cancel: () => this.onCancel('setVisibleForDetails')
      }
    }

    return (
      <DragModal {...attributes}>
        <Table
          ref={`${this.moduleName}Table`}
          columns={this.columns}
          dataSource={this.dataSource}
          rowKey="id"
          pagination={false}
          class="records-details-table"
          {...{
            scopedSlots: {
              operation: (text, record) => (
                <Button.Group>
                  <Button type="link" onClick={this.onViewDetailsClick}>查看明细</Button>
                  <Button type="link" onClick={() => this.onDelClick(record.id)}>申请开票</Button>
                </Button.Group>
              )
            }
          }}
        >
          <template slot="footer">
            <div class="receivable">
              <span>应收合计</span>
              <span>0</span>
            </div>
            <div class="actually-received">
              <span>实收金额</span>
              <span>0</span>
            </div>
          </template>
        </Table>
      </DragModal>
    )
  }
}
