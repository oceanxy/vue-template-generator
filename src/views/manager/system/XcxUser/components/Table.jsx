import '../assets/styles/index.scss'
import { Button, Space, Table, Tag } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import ImagePreview from '@/components/ImagePreview'

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
            title: '头像',
            width: 100,
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'avatarUrl' }
          },
          {
            title: '姓名',
            width: 100,
            dataIndex: 'nickName'
          },
          {
            title: '绑定企业账号',
            width: 160,
            scopedSlots: { customRender: 'companyListAccount' },
            key: 'companyListAccount'
          },
          {
            title: '绑定企业名称',
            width: 200,
            scopedSlots: { customRender: 'companyListName' },
            key: 'companyListName'
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
        name: 'systemXcxUser',
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
            avatarUrl: (text, record) => (
              <ImagePreview
                imageUrls={record.avatarUrlStr ? [record.avatarUrlStr] : []}
                width={32}
                height={32}
              />
            ),
            companyListAccount: (text, record) => (
              <ul
                style={{
                  paddingLeft: '20px',
                  marginBottom: 0
                }}
              >
                {
                  record.companyList?.map(item => (
                    <li>{item.loginAccount || '-'}</li>
                  ))
                }
              </ul>
            ),
            companyListName: (text, record) => (
              <ul
                style={{
                  paddingLeft: '20px', marginBottom: 0
                }}
              >
                {
                  record.companyList?.map(item => (
                    <li>{item.companyName}</li>
                  ))
                }
              </ul>
            ),
            status: (text, record) => {
              return record.status === 1 ? <Tag color="green">正常</Tag> : <Tag color="red">失效</Tag>
            },
            operation: (text, record) => (
              <Space>
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
