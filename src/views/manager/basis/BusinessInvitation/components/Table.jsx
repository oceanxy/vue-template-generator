import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import table from '@/mixins/table'

export default {
  mixins: [table],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            dataIndex: ''
          },
          {
            title: '图片',
            dataIndex: 'appName'
          },
          {
            title: '姓名',
            dataIndex: 'remark'
          },
          {
            title: '性别',
            align: 'center',
            dataIndex: 'zz'
          },
          {
            title: '手机号码',
            align: 'center',
            dataIndex: 'xx'
          },
          {
            title: '身份证号码',
            align: 'center',
            dataIndex: 'cc'
          },
          {
            title: '邮箱',
            align: 'center',
            dataIndex: 'vv'
          },
          {
            title: '所在团队',
            align: 'center',
            dataIndex: 'bb'
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
            width: 100,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    async onEditClick(record) {
      await this.$store.dispatch('setCurrentItem', {
        payload: record,
        moduleName: this.moduleName
      })
      await this.$store.dispatch('setVisibleOfEdit', {
        payload: true,
        moduleName: this.moduleName
      })
    }
  },
  render() {
    return (
      <Table
        ref={`${this.moduleName}Table`}
        loading={this.getLoading(this.moduleName)}
        {...{ props: this.tableProps }}
        {...{
          scopedSlots: {
            // status: (text, record) => (
            //   <Switch
            //     checked={+record.status === 1}
            //     onChange={checked => this.onStatusChange(checked, record)}
            //   />
            // ),
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
