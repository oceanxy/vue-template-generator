import table from '@/mixins/table'
import { Button, Table } from 'ant-design-vue'
import common from '@/mixins/common'

export default {
  mixins: [common, table],
  data: () => ({
    columns: [
      {
        title: '序号',
        scopedSlots: { customRender: 'allPath' }
      },
      {
        title: '流水号',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '缴费时间',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '场地',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '企业',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '金额',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '经办人',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '开票状态',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '操作',
        width: 100,
        align: 'center',
        scopedSlots: { customRender: 'operation' }
      }
    ],
    dataSource: [
      {}
    ]
  }),
  methods: {
    async onViewDetailsClick() {
      await this.dispatch('setVisibleForDetails', true)
    },
    async onInvoiceClick() {
      await this.dispatch('setVisibleForInvoice', true)
    }
  },
  render() {
    return (
      <Table
        ref={`${this.moduleName}Table`}
        columns={this.columns}
        dataSource={this.dataSource}
        rowKey="id"
        {...{
          scopedSlots: {
            operation: (text, record) => (
              <Button.Group>
                <Button type="link" onClick={this.onViewDetailsClick}>查看明细</Button>
                <Button type="link" onClick={this.onInvoiceClick}>申请开票</Button>
              </Button.Group>
            )
          }
        }}
      />
    )
  }
}
