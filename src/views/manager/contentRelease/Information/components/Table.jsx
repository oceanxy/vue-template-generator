import '../assets/styles/index.scss'
import { Button, Space, Switch, Table, Tag } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import ImagePreview from '@/components/ImagePreview'
import { mapGetters } from 'vuex'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 80,
            fixed: true,
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '标题',
            width: 300,
            dataIndex: 'articleTitle'
          },
          {
            title: '封面图',
            align: 'center',
            width: 120,
            scopedSlots: { customRender: 'coverImg' }
          },
          {
            title: '类别',
            width: 120,
            align: 'center',
            dataIndex: 'catName'
          },
          {
            title: '附件',
            width: 200,
            dataIndex: 'attachmentList',
            scopedSlots: { customRender: 'attachmentList' }
          },
          {
            title: '创建人',
            width: 120,
            dataIndex: 'author'
          },
          {
            title: '创建时间',
            width: 150,
            dataIndex: 'createTimeStr'
          },
          {
            title: '状态',
            width: 120,
            align: 'center',
            dataIndex: 'status',
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
        ],
        rowSelection: null
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    loading() {
      return this.getState('loading', this.moduleName)
    }
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.loading
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
            coverImg: (text, record) => {
              return (
                <ImagePreview
                  imageUrls={record.coverImg ? [record.coverImgStr] : []}
                  width={32}
                  height={32}
                />
              )
            },
            attachmentList: (text, record) => {
              return record.attachmentList?.length ? (
                <Tag color="green">{record.attachmentList?.length}个附件</Tag>
              ) : null
            },
            status: (text, record) => {
              return (
                <Switch
                  checked={record.status === 1}
                  onChange={checked => this.onStatusChange({
                    checked, record, nameKey: 'articleTitle'
                  })}
                />
              )
            },
            operation: (text, record) => (
              <Space>
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
