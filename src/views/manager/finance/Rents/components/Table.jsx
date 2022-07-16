import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            align: 'center',
            width: 60,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '月份',
            width: 150,
            dataIndex: 'billMonth'
          },
          {
            title: '场地',
            dataIndex: 'address'
            // scopedSlots: { customRender: 'address' }
          },
          {
            title: '企业',
            dataIndex: 'companyName'
          },
          {
            title: '金额',
            width: 150,
            dataIndex: 'amountStr'
          },
          {
            title: '结清状态',
            dataIndex: 'payStatusStr'
          }
        ]
      }
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
        class={'bnm-rescind-contract-table'}
        {...attributes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1,
            address: (text, record) => (
              <ul style={{ paddingLeft: '20px', marginBottom: 0 }}>
                {
                  record.address.split(',').map(item => (
                    <li>{item}</li>
                  ))
                }
              </ul>
            )
          }
        }}
      />
    )
  }
}
