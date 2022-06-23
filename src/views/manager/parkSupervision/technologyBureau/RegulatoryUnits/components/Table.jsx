import '../assets/styles/index.scss'
import { Button, Space, Switch, Table } from 'ant-design-vue'
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
            title: '单位名称',
            dataIndex: 'fullName'
          },
          {
            title: '所属园区',
            dataIndex: 'parkName'
          },
          {
            title: '账号',
            align: 'center',
            dataIndex: 'loginAccount'
          },
          {
            title: '负责人',
            align: 'center',
            dataIndex: 'employeeName'
          },
          {
            title: '负责人手机',
            align: 'center',
            dataIndex: 'employeeMobile'
          },
          {
            title: '联系电话',
            align: 'center',
            dataIndex: 'chargePhone'
          },
          {
            title: '状态',
            align: 'center',
            width: 60,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 120,
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
            status: (text, record) => (
              <Switch
                checked={+record.status === 1}
                onChange={checked => this.onStatusChange(checked, record)}
              />
            ),
            operation: (text, record) => (
              <Space class="operation-space">
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
                  onClick={() => this.onAddClick(record)}
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
