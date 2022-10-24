import forTable from '@/mixins/forTable'
import { Button, Table } from 'ant-design-vue'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            fixed: true,
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '流水号',
            width: 100,
            fixed: true,
            dataIndex: 'paySerialNumber'
          },
          {
            title: '缴费时间',
            width: 100,
            dataIndex: 'payEndTime'
          },
          {
            title: '场地',
            width: 100,
            dataIndex: 'address'
          },
          {
            title: '企业',
            width: 250,
            dataIndex: 'companyName'
          },
          {
            title: '金额',
            width: 100,
            dataIndex: 'payAmount'
          },
          {
            title: '经办人',
            width: 100,
            align: 'center',
            dataIndex: 'operateName'
          },
          {
            title: '开票状态',
            width: 100,
            align: 'center',
            fixed: 'right',
            dataIndex: 'isInvoiceStr'
          },
          {
            title: '操作',
            width: 100,
            fixed: 'right',
            align: 'center',
            scopedSlots: { customRender: 'operation' }
          }
        ],
        dataSource: []
      }
    }
  },
  computed: {
    loading() {
      return this.$store.state[this.moduleName].loading
    }
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.loading,
        dataSource: this.tableProps.dataSource || []
      }
    }

    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...attributes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1 + this.serialNumber,
            operation: (text, record) => (
              <div>
                <Button
                  type={'link'}
                  onClick={() => this._setVisibleOfModal(record, 'showModalForDetails')}
                >
                  查看明细
                </Button>
                {/*<Button*/}
                {/*  type={'link'}*/}
                {/*  onClick={() => this._setVisibleOfModal(record, 'showModalForInvoice')}*/}
                {/*>*/}
                {/*  申请开票*/}
                {/*</Button>*/}
              </div>
            )
          }
        }}
      />
    )
  }
}
