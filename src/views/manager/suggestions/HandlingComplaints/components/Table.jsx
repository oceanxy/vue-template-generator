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
            title: '投诉时间',
            width: 120,
            dataIndex: 'complaintTimeStr'
          },
          {
            title: '来源',
            width: 80,
            dataIndex: 'sourceTypeStr'
          },
          {
            title: '投诉企业',
            width: 150,
            dataIndex: 'companyName'
          },
          {
            title: '投诉类型',
            align: 'center',
            width: 80,
            dataIndex: 'complaintTypeStr'
          },
          {
            title: '投诉内容',
            width: 200,
            dataIndex: 'content'
          },
          {
            title: '图片',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'acceptImg' }
          },
          {
            title: '处理状态',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'acceptStatus' }
          },
          {
            title: '处理结果',
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
            acceptImg: (text, record) => (
              <ImagePreview
                imageUrls={record.acceptImgList?.map(item => item.path) ?? []}
                width={32}
                height={32}
              />
            ),
            acceptStatus: (text, record) => (
              <span
                style={{
                  color: [
                    '#52c41a',
                    '#f5222d',
                    '#faad14',
                    '#89c5ff'
                  ][record.acceptStatus - 1]
                }}
              >{record.acceptStatusStr}</span>
            ),
            operation: (text, record) => (
              <Space>
                {
                  record.acceptStatus === 2 || record.acceptStatus === 4
                    ? [
                      <Button
                        type="link"
                        size="small"
                        onClick={() => this._setVisibleOfModal(record, 'visibleOfProcess')}
                      >
                        处理
                      </Button>,
                      <Button
                        type="link"
                        size="small"
                        onClick={() => this._setVisibleOfModal(record, 'visibleOfAssign')}
                      >
                        转出
                      </Button>
                    ]
                    : null
                }
              </Space>
            )
          }
        }}
      />
    )
  }
}
