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
            title: '问卷标题',
            dataIndex: 'appName'
          },
          {
            title: '有效期',
            dataIndex: 'remark'
          },
          {
            title: '参与',
            align: 'center',
            dataIndex: 'zz'
          },
          {
            title: '未参与',
            align: 'center',
            dataIndex: 'xx'
          },
          {
            title: '创建人',
            align: 'center',
            dataIndex: 'cc'
          },
          {
            title: '创建时间',
            align: 'center',
            scopedSlots: { customRender: 'time' }
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
            width: 500,
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
                  预览
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfQuestionnaireSwitch')}
                >
                  发布
                </Button>
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
                  onClick={() => this.onDeleteClick(record)}
                >
                  删除
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfQuestionnaireSwitch')}
                >
                  结束
                </Button>
                <Button
                  type="link"
                  size="small"
                  // onClick={() => this.onDeleteClick(record)}
                >
                  问卷记录
                </Button>
                <Button
                  type="link"
                  size="small"
                  // onClick={() => this.onDeleteClick(record)}
                >
                  问卷统计
                </Button>
                <Button
                  type="link"
                  size="small"
                  // onClick={() => this.onDeleteClick(record)}
                >
                  导出结果
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
