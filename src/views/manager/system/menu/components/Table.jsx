import '../assets/styles/index.scss'
import { Button, Space, Table, Tag, Switch } from 'ant-design-vue'
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
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '所属父级',
            dataIndex: 'parentName'
          },
          {
            title: '名称',
            dataIndex: 'menuName'
          },
          {
            title: 'URL',
            dataIndex: 'menuUrl'
          },

          {
            title: '是否显示',
            // align: 'center',
            width: 80,
            scopedSlots: { customRender: 'isShow' }
          },
          {
            title: '是否首选',
            width: 80,
            scopedSlots: { customRender: 'isDefault' }
          },
          {
            title: '排序',
            // align: 'center',
            width: 80,
            scopedSlots: { customRender: 'sortIndex' }
          },
          {
            title: '状态',
            // align: 'center',
            width: 80,
            scopedSlots: { customRender: 'status' }
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
  methods: {
    async onDetailsClick(record) {
      await this.$router.push({
        name: 'contractReviewDetails',
        query: {
          cid: record.id // contractID
        }
      })
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
            isShow: (text, record) => {
              return record.isShow === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
            },
            isDefault: (text, record) => {
              return record.isDefault === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
            },
            status: (text, record) => {
              return (
                <Switch
                  checked={record.status === 1}
                  onclick={() => this.onStatusChange(!record.status === 1, record)}></Switch>
              )
            },
            operation: (text, record) => (
              <Space class="operation-space">
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
