import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import ImagePreview from '@/components/ImagePreview'
import Message from '@/utils/message'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        rowSelection: null,
        columns: [
          {
            title: '序号',
            align: 'center',
            width: 60,

            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '流水号',
            width: 120,
            fixed: true,
            dataIndex: 'paySerialNumber'
          },
          {
            title: '缴费时间',
            width: 150,
            dataIndex: 'payEndTime'
          },
          {
            title: '场地',
            width: 150,
            scopedSlots: { customRender: 'address' }
          },
          {
            title: '企业',
            width: 250,
            dataIndex: 'companyName'
          },
          {
            title: '支付凭证',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'payCredentials' }
          },
          {
            title: '缴费金额(￥)',
            width: 150,
            align: 'center',
            dataIndex: 'amount'
          },
          {
            title: '经办人',
            width: 100,
            fixed: 'right',
            dataIndex: 'operateName'
          },
          {
            title: '支付状态',
            width: 100,
            fixed: 'right',
            align: 'center',
            scopedSlots: { customRender: 'payStatus' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 200,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    async confirmedPaid(id) {
      await Message.verificationDialog(async () => {
        return await this.$store.dispatch('custom', {
          payload: { id },
          customApiName: 'confirmedPaid',
          closeModalAfterFetched: false,
          isFetchList: true,
          moduleName: this.moduleName
        })
      }, '此操作不可撤销，是否要确认收款？', '确认收款成功！')
    }
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName)
      }
    }

    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...attributes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1,
            payCredentials: (text, record) => (
              <ImagePreview
                imageUrls={record.payCredentialsList || []}
                width={80}
                height={80}
              />
            ),
            payStatus: (text, record) => (
              <span
                style={{
                  color: [
                    '#faad14',
                    '#fa541c',
                    '#52c41a',
                    '#f5222d',
                    '#878787',
                    '#bfbfbf'
                  ][+record.payStatus - 1]
                }}
              >
                {record.payStatusStr}
              </span>
            ),
            address: (text, record) => (
              <ul
                style={{
                  paddingLeft: '20px',
                  marginBottom: 0
                }}
              >
                {
                  record.address?.split(',').map(item => (
                    <li>{item}</li>
                  ))
                }
              </ul>
            ),
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfPaymentRecords')}
                >
                  查看明细
                </Button>
                {
                  record.payStatus === 2 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this.confirmedPaid(record.id)}
                    >
                      确认收款
                    </Button>
                  ) : null
                }
              </Space>
            )
          }
        }}
      />
    )
  }
}
