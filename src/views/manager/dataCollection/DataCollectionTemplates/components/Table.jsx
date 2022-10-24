import '../assets/styles/index.scss'
import { Button, Space, Switch, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            fixed: true,
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '名称',
            width: 120,
            dataIndex: 'fullName'
          },
          {
            title: '模版项目',
            width: 120,
            align: 'center',
            scopedSlots: { customRender: 'itemNum' }
          },
          {
            title: '类型',
            width: 120,
            dataIndex: 'templateTypeStr'
          },
          {
            title: '创建人',
            width: 120,
            dataIndex: 'creatorName'
          },
          {
            title: '创建时间',
            width: 120,
            dataIndex: 'createTimeStr'
          },
          {
            title: '状态',
            align: 'center',
            width: 80,
            fixed: 'right',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 120,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    async onItemClick(record) {
      await this._setVisibleOfModal(record, 'visibleOfPreview')
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
            serialNumber: (text, record, index) => index + 1 + this.serialNumber,
            itemNum: (text, record, index) => (
              <Button
                type="link"
                onClick={() => this.onItemClick(record)}
              >
                {record.itemNum}
              </Button>
            ),
            status: (text, record) => (
              <Switch
                checked={+record.status === 1}
                onChange={checked => this.onStatusChange({ checked, record })}
              />
            ),
            operation: (text, record) => (
              <Space>
                {/*<Button*/}
                {/*  type={'link'}*/}
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
