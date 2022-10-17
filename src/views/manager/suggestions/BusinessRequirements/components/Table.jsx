import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
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
            title: '提交时间',
            width: 120,
            dataIndex: 'acceptTimeStr'
          },
          {
            title: '提交企业',
            width: 150,
            dataIndex: 'companyName'
          },
          {
            title: '需求内容',
            width: 200,
            dataIndex: 'content'
          },
          {
            title: '图片',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'imgList' }
          },
          {
            title: '处理状态',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'acceptStatus' }
          },
          {
            title: '回复内容',
            width: 200,
            dataIndex: 'acceptResult'
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'operation' }
          }
        ]
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
            serialNumber: (text, record, index) => index + 1,
            imgList: (text, record) => (
              <ImagePreview
                imageUrls={record.imgList?.map(item => item.path) ?? []}
                width={32}
                height={32}
              />
            ),
            acceptStatus: (text, record) => (
              <span style={{ color: ['#52c41a', '#f5222d'][record.acceptStatus - 1] }}>
                {
                  record.acceptStatusStr
                }
              </span>
            ),
            operation: (text, record) => (
              <Space>
                {
                  record.acceptStatus === 2
                    ? (
                      <Button
                        type="link"
                        size="small"
                        onClick={() => this._setVisibleOfModal(record, 'visibleOfReply')}
                      >
                        回复
                      </Button>
                    )
                    : null
                }
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
