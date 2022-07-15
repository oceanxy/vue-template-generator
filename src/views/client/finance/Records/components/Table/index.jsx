import forTable from '@/mixins/forTable'
import { Table, Spin } from 'ant-design-vue'

export default {
  mixins: [forTable()],
  data: () => ({
    columns: [
      {
        title: '序号',
        width: 60,
        align: 'center',
        scopedSlots: { customRender: 'serialNumber' }
      },
      {
        title: '流水号',
        width: 100,
        dataIndex: 'paySerialNumber'
      },
      {
        title: '缴费时间',
        width: 100,
        dataIndex: 'payEndTime'
      },
      {
        title: '场地',
        width: 250,
        dataIndex: 'address'
      },
      {
        title: '企业',
        width: 200,
        dataIndex: 'companyName'
      },
      {
        title: '金额',
        width: 150,
        dataIndex: 'payAmount'
      },
      {
        title: '经办人',
        width: 100,
        dataIndex: 'operateName'
      },
      {
        title: '开票状态',
        width: 100,
        dataIndex: 'isInvoiceStr'
      },
      {
        title: '操作',
        width: 100,
        fixed: 'right',
        scopedSlots: { customRender: 'operation' }
      }
    ]
  }),
  computed: {
    loading() {
      return this.$store.state[this.moduleName].loading
    }
  },
  methods: {},
  render() {
    return (
      <Spin spinning={this.loading}>
        <Table
          ref={`${this.moduleName}Table`}
          columns={this.columns}
          dataSource={this.tableProps.dataSource}
          pagination={false}
          rowKey="id"
          {...{
            scopedSlots: {
              serialNumber: (text, record, index) => index + 1,
              operation: (text, record) => (
                <div>
                  <a onClick={() => this._setVisibleOfModal(record, 'showModalForDetails')}>查看明细</a>
                  {/* <a onClick={() => this._setVisibleOfModal(record, 'showModalForInvoice')}>申请开票</a> */}
                </div>
              )
            }
          }}
        />
      </Spin>
    )
  }
}
