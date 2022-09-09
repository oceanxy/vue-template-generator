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
            fixed: true,
            width: 140,
            dataIndex: 'fullName'
          },
          {
            title: '题目数',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'itemNum' }
          },
          {
            title: '创建人/时间',
            width: 140,
            scopedSlots: { customRender: 'creator' }
          },
          {
            title: '最后修改人/时间',
            width: 140,
            scopedSlots: { customRender: 'editor' }
          },
          {
            title: '状态',
            align: 'center',
            fixed: 'right',
            width: 80,
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
            serialNumber: (text, record, index) => index + 1,
            creator: (text, record) => (
              <div>
                <div>{record.creatorName}</div>
                <div>{record.createTimeStr}</div>
              </div>
            ),
            editor: (text, record) => (
              <div>
                <div>{record.lastOperatorName}</div>
                <div>{record.lastOperateTimeStr}</div>
              </div>
            ),
            itemNum: (text, record, index) => (
              <Button type="link" onClick={() => this.onItemClick(record)}>
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
                <Button type="link" size="small" onClick={() => this.onEditClick(record)}>
                  编辑
                </Button>
                <Button type="link" size="small" onClick={() => this.onDeleteClick(record)}>
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
