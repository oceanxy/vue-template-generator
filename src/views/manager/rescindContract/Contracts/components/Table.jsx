import '../index.scss'
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
            align: 'center',
            width: 60,
            scopedSlots: { customRender: 'index' }
          },
          {
            title: '合同',
            dataIndex: 'contractNo'
          },
          {
            title: '签约类型',
            align: 'center',
            width: 80,
            dataIndex: 'signingTypeStr'
          },
          {
            title: '企业名称',
            dataIndex: 'companyName'
          },
          {
            title: '场地',
            scopedSlots: { customRender: 'address' }
          },
          {
            title: '期限',
            dataIndex: 'contractTime'
          },
          {
            title: '状态',
            align: 'center',
            width: 120,
            scopedSlots: { customRender: 'signingStatus' }
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 180,
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
        class={'bnm-rescind-contract-table'}
        {...attributes}
        {...{
          scopedSlots: {
            index: (text, record, index) => <span> {index + 1}</span>,
            contractNo: (text, record) => (
              <div>
                <div>{record.fullName}</div>
                <div>{record.contractNo}</div>
              </div>
            ),
            signingStatus: (text, record) => (
              <div>
                <div>{record.signingStatusStr}</div>
                {
                  record.specialTips ? <Tag color={'red'}>{record.specialTips}</Tag> : null
                }
              </div>
            ),
            address: (text, record) => (
              <ul>
                {
                  record.address.split(',').map(item => (
                    <li>{item}</li>
                  ))
                }
              </ul>
            ),
            operation: (text, record) => (
              <Space class="operation-space">
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfRenew')}
                >
                  续约
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfTerminate')}
                >
                  解约
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfExpirationReminder')}
                >
                  到期提醒
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
