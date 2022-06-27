import { Button, Table } from 'ant-design-vue'
import forIndex from '@/mixins/forIndex'
import BNContainer from '@/components/BNContainer'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forIndex, forTable],
  data: () => ({
    columns: [
      {
        title: '序号',
        scopedSlots: { customRender: 'allPath' }
      },
      {
        title: '预约时间',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '会议室',
        scopedSlots: { customRender: 'remark' }
      },
      {
        title: '占用时间',
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
    async onCancelClick() {
      //
    }
  },
  render() {
    return (
      <BNContainer modalTitle='会议室预约 > 我的预约记录'>
        <Table
          ref={`${this.moduleName}Table`}
          columns={this.columns}
          dataSource={this.dataSource}
          rowKey="id"
          {...{
            scopedSlots: {
              operation: (text, record) => (
                <Button type="link" onClick={this.onCancelClick}>取消预约</Button>
              )
            }
          }}
        />
      </BNContainer>
    )
  }
}
