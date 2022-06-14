import '../assets/styles/index.scss'
import { Button, Dropdown, Icon, Menu, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            dataIndex: ''
          },
          {
            title: '场地',
            dataIndex: 'appName'
          },
          {
            title: '企业',
            dataIndex: 'remark'
          },
          {
            title: '用户名',
            align: 'center',
            dataIndex: 'zz'
          },
          {
            title: '企业类型',
            align: 'center',
            dataIndex: 'xx'
          },
          {
            title: '负责人',
            align: 'center',
            dataIndex: 'cc'
          },
          {
            title: '联系电话',
            align: 'center',
            dataIndex: 'vv'
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
            width: 200,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    onDetailsClick(record) {
      this.$router.push({ name: 'businessesDetails' })
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
                  onClick={() => this.onDetailsClick(record)}
                >
                  查看详情
                </Button>
                <Button
                  type="link"
                  size="small"
                >
                  企业服务
                </Button>
                <Dropdown>
                  <Icon type="caret-down" class="caret-down" />
                  <Menu slot="overlay">
                    <Menu.Item>重置密码</Menu.Item>
                    <Menu.Item>账单查询</Menu.Item>
                    <Menu.Item>缴费记录</Menu.Item>
                    <Menu.Item>投诉建议</Menu.Item>
                  </Menu>
                </Dropdown>
              </Space>
            )
          }
        }}
      />
    )
  }
}
