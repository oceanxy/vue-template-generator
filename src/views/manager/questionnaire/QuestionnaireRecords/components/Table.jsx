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
            title: '问卷标题',
            dataIndex: 'appName'
          },
          {
            title: '填写企业名称',
            dataIndex: 'remark'
          },
          {
            title: '负责人',
            align: 'center',
            dataIndex: 'zz'
          },
          {
            title: '联系电话',
            align: 'center',
            dataIndex: 'xx'
          },
          {
            title: '填写时间',
            align: 'center',
            dataIndex: 'cc'
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
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfResults')}
                >
                  查看结果
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
