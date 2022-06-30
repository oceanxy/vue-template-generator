import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            dataIndex: ''
          },
          {
            title: '企业',
            dataIndex: 'appName'
          },
          {
            title: '签约类型',
            dataIndex: 'remark'
          },
          {
            title: '签约场地',
            align: 'center',
            dataIndex: 'zz'
          },
          {
            title: '签约期限',
            align: 'center',
            dataIndex: 'xx'
          },
          {
            title: '费用/优惠',
            align: 'center',
            dataIndex: 'ccC'
          },
          {
            title: '状态',
            align: 'center',
            width: 60,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '签约合同',
            align: 'center',
            dataIndex: 'ccA'
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 300,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    onReSignClick(record) {
      this.$router.push({ name: 'signingProcess' })
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
                  onClick={() => this.onReSignClick(record)}
                >
                  重新签约
                </Button>
                <Button
                  type="link"
                  size="small"
                  // onClick={() => this.onEditClick(record)}
                >
                  续约
                </Button>
                <Button
                  type="link"
                  size="small"
                  // onClick={() => this.onEditClick(record)}
                >
                  解约
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
