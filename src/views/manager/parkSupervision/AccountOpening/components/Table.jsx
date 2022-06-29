import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable],
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
            title: '申请账号',
            dataIndex: 'loginAccount'
          },
          {
            title: '角色',
            dataIndex: 'roleNames'
          },
          {
            title: '申请单位',
            dataIndex: 'applicantOrganName'
          },
          {
            title: '所属园区',
            dataIndex: 'parkName'
          },
          {
            title: '申请时间',
            dataIndex: 'applyTimeStr'
          },
          {
            title: '审核状态',
            scopedSlots: { customRender: 'auditStatus' }
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 80,
            scopedSlots: { customRender: 'operation' }
          }
        ]
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

    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...attributes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1,
            auditStatus: record => {
              return [
                <span style={{ color: '#22d88c' }}>通过</span>,
                <span>待审核</span>,
                <span style={{ color: '#d82622' }}>驳回</span>
              ][+record.auditStatus - 1]
            },
            operation: record => (
              <Space class="operation-space">
                {
                  record.auditStatus === 2 ? (
                    <Button
                      type="link"
                      size="small"

                      onClick={() => this.onAuditClick(record.id)}
                    >
                      审核
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
