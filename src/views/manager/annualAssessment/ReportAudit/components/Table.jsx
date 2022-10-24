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
            title: '企业名称',
            fixed: true,
            dataIndex: 'objName'
          },
          {
            title: '报表名称',
            dataIndex: 'reportName'
          },
          {
            title: '考核得分',
            dataIndex: 'score'
          },
          {
            title: '提交时间',
            dataIndex: 'createTimeStr'
          },
          {
            title: '租金补缴额',
            dataIndex: 'rentPay'
          },
          {
            title: '状态',
            align: 'center',
            fixed: 'right',
            width: 80,
            dataIndex: 'auditStatusStr'
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 120,
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
            serialNumber: (text, record, index) => index + 1 + this.serialNumber,
            status: (text, record) => (
              <Switch
                checked={+record.status === 1}
                onChange={checked => this.onStatusChange({ checked, record })}
              />
            ),
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onAuditClick(record.id)}
                >
                  审核
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfDetails')}
                >
                  查看详情
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
