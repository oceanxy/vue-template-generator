import '../assets/styles/index.scss'
import { Button, Space, Table, Tag } from 'ant-design-vue'
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
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '企业',
            width: 200,
            fixed: true,
            dataIndex: 'companyName',
            scopedSlots: { customRender: 'companyName' }
          },
          {
            title: '位置',
            width: 200,
            dataIndex: 'itemName'
          },
          {
            title: '优惠政策',
            width: 120,
            dataIndex: 'ruleName'
          },
          {
            title: '优惠额',
            width: 80,
            dataIndex: 'saleAmount',
            scopedSlots: { customRender: 'saleAmount' }
          },
          {
            title: '创建人',
            width: 80,
            dataIndex: 'creatorName'
          },
          // {
          //   title: '手机号码',
          //   align: 'center',
          //   dataIndex: 'saleCompanyType'
          // },
          {
            title: '创建时间',
            width: 140,
            dataIndex: 'createTimeStr'
          },
          {
            title: '状态',
            width: 80,
            fixed: 'right',
            dataIndex: 'status',
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
        ],
        rowSelection: null
      }
    }
  },
  methods: {},
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName)
      }
    }
    const getStatus = record => {
      if (record.auditStatus === 3) {
        return <Tag color="green">已生效</Tag>
      } else if (record.auditStatus === 4) {
        return <Tag color="red">已驳回</Tag>
      } else if (record.auditStatus === 2) {
        return <Tag color="orange">待审核</Tag>
      }
    }

    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...attributes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1,
            companyName: (text, record) => (
              <a onclick={() => this._setVisibleOfModal(record, 'visibleOfEnterprise')}>{record.companyName}</a>
            ),
            saleAmount: (text, record) => <span style={{ color: 'red' }}>{record.saleAmount}</span>,
            status: (text, record) => {
              return getStatus(record)
            },
            operation: (text, record) => {
              return record.auditStatus !== 3 ? (
                <Space>
                  <Button type="link" size="small" onClick={() => this.onEditClick(record)}>
                    编辑
                  </Button>
                  <Button type="link" size="small" onClick={() => this.onDeleteClick(record)}>
                    删除
                  </Button>
                </Space>
              ) : null
            }
          }
        }}
      />
    )
  }
}
