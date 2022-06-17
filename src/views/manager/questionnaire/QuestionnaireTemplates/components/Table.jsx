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
            title: '名称',
            scopedSlots: { customRender: 'title' }
          },
          {
            title: '题目数',
            dataIndex: 'remark'
          },
          {
            title: '创建人/时间',
            align: 'center',
            dataIndex: 'zz'
          },
          {
            title: '最后修改人/时间',
            align: 'center',
            dataIndex: 'xx'
          },
          {
            title: '状态',
            align: 'center',
            dataIndex: 'cc'
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 150,
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
            title: record => (
              <Button
                class={'table-link'}
                type={'link'}
                onClick={() => this._setVisibleOfModal(record, 'visibleOfPreview')}
              >
                {record.appName}
              </Button>
            ),
            // status: (text, record) => (
            //   <Switch
            //     checked={+record.status === 1}
            //     onChange={checked => this.onStatusChange(checked, record)}
            //   />
            // ),
            operation: (text, record) => (
              <Space class="operation-space">
                {/*<Button*/}
                {/*  type="link"*/}
                {/*  size="small"*/}
                {/*  // onClick={() => this._setVisibleOfModal(record, 'visibleOfPreview')}*/}
                {/*>*/}
                {/*  预览*/}
                {/*</Button>*/}
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
                  onClick={this.onDeleteClick}
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
