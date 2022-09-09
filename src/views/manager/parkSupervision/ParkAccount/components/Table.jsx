import '../assets/styles/index.scss'
import { Button, Space, Switch, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data () {
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
            title: '用户名',
            fixed: true,
            width: 100,
            dataIndex: 'loginName'
          },
          {
            title: '角色',
            width: 200,
            dataIndex: 'roleNames'
          },
          {
            title: '所属单位',
            width: 160,
            dataIndex: 'unitName'
          },
          {
            title: '姓名',
            width: 60,
            dataIndex: 'fullName'
          },
          {
            title: '手机号',
            width: 100,
            dataIndex: 'mobile'
          },
          {
            title: '状态',
            align: 'center',
            fixed: 'right',
            width: 60,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 150,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    async onUpdatePasswordClick (record) {
      await this._setVisibleOfModal(record, 'visibleOfUpdatePassword')
    }
  },
  render () {
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
                onChange={checked => this.onStatusChange({ checked, record })}
              />
            ),
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
                  onClick={() => this.onUpdatePasswordClick(record)}
                >
                  重置密码
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
