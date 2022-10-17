import '../assets/styles/index.scss'
import { Button, Space, Switch, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable(true, false)],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '类型名称',
            width: 100,
            dataIndex: 'catName'
          },
          {
            title: '描述',
            dataIndex: 'description'
          },
          {
            title: '排序',
            width: 80,
            dataIndex: 'sortIndex'
          },
          {
            title: '状态',
            width: 80,
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '创建时间',
            width: 120,
            dataIndex: 'createTimeStr'
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 120,
            scopedSlots: { customRender: 'operation' }
          }
        ],
        rowKey: 'catId'
      }
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
            serialNumber: (text, record, index) => {
              return <span>{index + 1}</span>
            },
            status: (text, record) => {
              return (
                <Switch
                  checked={record.status === 1}
                  onChange={checked => this.onStatusChange({
                    checked, record, nameKey: 'catName'
                  })}
                />
              )
            },
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onEditClick({
                    ...record,
                    id: record.catId
                  })}
                >
                  编辑
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onDeleteClick({
                    ...record,
                    id: record.catId
                  })}
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
