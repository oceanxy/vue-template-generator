import '../assets/styles/index.scss'
import { Table, Switch, Space, Button } from 'ant-design-vue'
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
            width: 80,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '设备编号',
            dataIndex: 'eqId'
          },
          {
            title: '设备名称',
            dataIndex: 'eqName'
          },
          {
            title: '厂家',
            dataIndex: 'manufactor'
          },
          {
            title: '联系电话',
            dataIndex: 'contactTel'
          },
          {
            title: '用户名',
            dataIndex: 'userName'
          },
          {
            title: '备注',
            dataIndex: 'remark'
          },
          {
            title: '排序',
            align: 'center',
            width: 80,
            dataIndex: 'sortIndex'
          },
          {
            title: '创建时间',
            dataIndex: 'createTimeStr'
          },
          {
            title: '状态',
            align: 'center',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            align: 'center',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  render() {
    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...this.attributes}
        {...{
          scopedSlots: {
            serialNumber: this.getConsecutiveSerialNumber,
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
                  修改
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
