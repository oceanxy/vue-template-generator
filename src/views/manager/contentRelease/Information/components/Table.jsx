import '../assets/styles/index.scss'
import { Button, Space, Switch, Table, Tag } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import ImagePreview from '@/components/ImagePreview'
import { mapAction } from '@/utils/store'

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
            title: '封面图',
            dataIndex: 'coverImg',
            width: 120,
            scopedSlots: { customRender: 'coverImg' }
          },
          {
            title: '标题',
            dataIndex: 'articleTitle'
          },
          {
            title: '类别',
            width: 100,
            dataIndex: 'catName'
          },
          {
            title: '附件',
            width: 100,
            dataIndex: 'attachmentList',
            scopedSlots: { customRender: 'attachmentList' }
          },
          {
            title: '创建人',
            width: 100,
            dataIndex: 'author'
          },
          {
            title: '创建时间',
            width: 100,
            dataIndex: 'createTimeStr'
          },
          {
            title: '状态',
            width: 80,
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
  methods: { ...mapAction([]) },
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
                  onChange={checked => this.onStatusChange({ checked, record, nameKey: 'articleTitle' })}
                />
              )
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
