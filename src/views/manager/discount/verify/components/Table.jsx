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
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '企业',
            dataIndex: 'companyName',
            scopedSlots: { customRender: 'companyName' }
          },
          {
            title: '位置',
            dataIndex: 'itemName'
          },
          {
            title: '优惠政策',
            dataIndex: 'ruleName'
          },
          {
            title: '优惠额',
            dataIndex: 'saleAmount',
            scopedSlots: { customRender: 'saleAmount' }
          },
          {
            title: '创建人',
            dataIndex: 'creatorName'
          },
          // {
          //   title: '手机号码',
          //   align: 'center',
          //   dataIndex: 'saleCompanyType'
          // },
          {
            title: '创建时间',
            dataIndex: 'createTimeStr'
          },
          {
            title: '状态',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '企业文件',
            dataIndex: 'file',
            scopedSlots: { customRender: 'file' }
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
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
            file: (text, record) => (
              <Button type="link" onClick={() => this._setVisibleOfModal(record, 'visibleOfFile')}>
                查看
              </Button>
            ),
            operation: (text, record) => {
              return (
                <Space class="operation-space">
                  {record.auditStatus === 2 ? (
                    <Button type="link" size="small" onClick={() => this._setVisibleOfModal(record, 'visibleOfAudit')}>
                      审核
                    </Button>
                  ) : null}
                </Space>
              )
            }
          }
        }}
      />
    )
  }
}
