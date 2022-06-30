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
            title: '申请时间',
            dataIndex: 'appName'
          },
          {
            title: '申请企业',
            dataIndex: 'remark'
          },
          {
            title: '签约场地',
            align: 'center',
            dataIndex: 'zz'
          },
          {
            title: '申请类型',
            align: 'center',
            dataIndex: 'xx'
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
                  // onClick={() => this.onEditClick(record)}
                >
                  前往续约
                </Button>
                <Button
                  type="link"
                  size="small"
                  // onClick={() => this.onEditClick(record)}
                >
                  前往解约
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfRejectApplication')}
                >
                  拒绝申请
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
