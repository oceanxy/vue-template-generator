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
            dataIndex: ''
          },
          {
            title: '图片',
            dataIndex: 'appName'
          },
          {
            title: '编号',
            dataIndex: 'remark'
          },
          {
            title: '团队名称',
            align: 'center',
            dataIndex: 'zz'
          },
          {
            title: '所属园区',
            align: 'center',
            dataIndex: 'xx'
          },
          {
            title: '团队人数',
            align: 'center',
            dataIndex: 'cc'
          },
          {
            title: '负责人',
            align: 'center',
            dataIndex: 'vv'
          },
          {
            title: '负责人手机号',
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
            width: 200,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    onMembersManaClick(record) {
      this.$router.push({ name: 'teamMembers' })
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
                  onClick={() => this.onEditClick(record)}
                >
                  编辑
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onMembersManaClick(record)}
                >
                  成员管理
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onDeleteClick(record)}
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
