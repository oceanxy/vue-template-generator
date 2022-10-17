import '../assets/styles/index.scss'
import { Button, Space, Switch, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

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
            title: '名称',
            width: 140,
            dataIndex: 'ruleName'
          },
          {
            title: '优惠费项',
            width: 150,
            dataIndex: 'itemName'
          },
          {
            title: '折扣',
            width: 200,
            dataIndex: 'saleType'
          },
          {
            title: '优惠时间',
            width: 140,
            dataIndex: 'saleTime'
          },
          // {
          //   title: '优惠范围',
          //   dataIndex: 'scopeDesc'
          // },
          // {
          //   title: '优惠企业类型',
          //   align: 'center',
          //   dataIndex: 'saleCompanyType'
          // },
          // {
          //   title: '优惠合同类型',
          //   align: 'center',
          //   dataIndex: 'saleContractType'
          // },
          {
            title: '状态',
            dataIndex: 'status',
            fixed: 'right',
            width: 60,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'operation' }
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
        {...attributes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1,
            status: (text, record) => {
              return (
                <Switch
                  checked={record.status === 1}
                  onChange={checked => this.onStatusChange({ checked, record })}
                />
              )
            },
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onEditClick(record)}
                >
                  编辑
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onDeleteClick(record)}
                >
                  删除
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
