import '../assets/styles/index.scss'
import { Button, Space, Table, Tag } from 'ant-design-vue'
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
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '用户名',
            width: 100,
            fixed: true,
            dataIndex: 'loginName'
          },
          {
            title: '角色',
            width: 160,
            dataIndex: 'roleNames'
          },
          {
            title: '所属组织',
            width: 120,
            // align: 'center',
            dataIndex: 'organName'
          },
          {
            title: '姓名',
            // align: 'center',
            width: 100,
            dataIndex: 'fullName'
          },
          {
            title: '手机号码',
            // align: 'center',
            width: 100,
            dataIndex: 'mobile'
          },
          {
            title: '状态',
            // align: 'center',
            width: 80,
            fixed: 'right',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            width: 200,
            align: 'center',
            fixed: 'right',
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
        query: {cid: record.id // contractID
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
            status: (text, record) => {
              return record.status === 1 ? <Tag color="green">正常</Tag> : <Tag color="red">失效</Tag>
            },
            operation: (text, record) => (
              <Space>
                <Button type="link" size="small" onClick={() => this.onEditClick(record)}>
                  编辑
                </Button>
                <Button type="link" size="small" onClick={() => this._setVisibleOfModal(record, 'visibleOfResetPwd')}>
                  重置密码
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
