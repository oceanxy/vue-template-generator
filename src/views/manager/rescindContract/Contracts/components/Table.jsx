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
            fixed: true,
            scopedSlots: { customRender: 'index' }
          },
          {
            title: '合同编号',
            fixed: true,
            width: 180,
            dataIndex: 'contractNo'
          },
          {
            title: '签约类型',
            align: 'center',
            width: 120,
            dataIndex: 'signingTypeStr'
          },
          {
            title: '企业名称',
            width: 250,
            dataIndex: 'companyName'
          },
          {
            title: '场地',
            width: 200,
            scopedSlots: { customRender: 'address' }
          },
          {
            title: '期限',
            width: 120,
            dataIndex: 'contractTime'
          },
          {
            title: '状态',
            align: 'center',
            fixed: 'right',
            width: 150,
            scopedSlots: { customRender: 'signingStatus' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 220,
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
            signingStatus: (text, record) => (
              <div>
                <div>{record.signingStatusStr}</div>
                {record.specialTips ? <Tag color={'red'}>{record.specialTips}</Tag> : null}
              </div>
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
                {record.signingStatus === 3 || record.signingStatus === 9 ? (
                  <Button
                    type="link"
                    size="small"
                    onClick={() => this._setVisibleOfModal(record, 'visibleOfRenew')}
                  >
                    续约
                  </Button>
                ) : null}
                {record.signingStatus === 3 ? (
                  <Button
                    type="link"
                    size="small"
                    onClick={() => this._setVisibleOfModal(record, 'visibleOfTerminate')}
                  >
                    解约
                  </Button>
                ) : null}
                {record.signingStatus === 3 ? (
                  <Button
                    type="link"
                    size="small"
                    onClick={() => this._setVisibleOfModal(record, 'visibleOfExpirationReminder')}
                  >
                    到期提醒
                  </Button>
                ) : null}
              </Space>
            )
          }
        }}
      />
    )
  }
}
