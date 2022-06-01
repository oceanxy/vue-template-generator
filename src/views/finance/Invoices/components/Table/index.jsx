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
        title: '开票时间',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '开票号',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '发票抬头',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '发票金额',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '接收邮箱',
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
    async onDownloadClick() {
      //
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
              <Button type="link" onClick={this.onDownloadClick}>下载发票</Button>
            )
          }
        }}
      />
    )
  }
}
