import '../assets/styles/index.scss'
import { Button, Space, Table, Tag } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import ImagePreview from '@/components/ImagePreview'
import Message from '@/utils/message'
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
            title: '报修时间',
            width: 120,
            dataIndex: 'repairTimeStr'
          },
          {
            title: '报修企业',
            width: 180,
            dataIndex: 'companyName'
          },
          {
            title: '报修项',
            width: 120,
            dataIndex: 'repairItem'
          },
          {
            title: '情况说明',
            width: 180,
            dataIndex: 'description'
          },
          {
            title: '图片',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'imgList' }
          },
          {
            title: '处理状态',
            width: 80,
            dataIndex: 'acceptStatus',
            scopedSlots: { customRender: 'acceptStatus' }
          },
          {
            title: '处理人',
            width: 100,
            dataIndex: 'assigneeName'
          },
          {
            title: '处理结果',
            width: 180,
            dataIndex: 'acceptResult'
          },
          {
            title: '处理时间',
            width: 120,
            dataIndex: 'acceptTimeStr'
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 180,
            scopedSlots: { customRender: 'operation' }
          }
        ],
        rowSelection: null
      }
    }
  },
  methods: {
    ...mapAction(['revokeWorkOrder']),
    async cancelOrder(record) {
      Message.verificationDialog(async () => {
        const res = await this.revokeWorkOrder({ payload: { id: record.id } })

        if (res.status) {
          this.fetchList()
        }

        return res.status
      }, '确定要撤销吗？')
    }
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName)
      }
    }
    const getStatus = record => {
      if (record.acceptStatus === 1) {
        return <Tag color="green">已处理</Tag>
      } else if (record.acceptStatus === 2) {
        return <Tag color="red">待处理</Tag>
      } else if (record.acceptStatus === 3) {
        return <Tag>已撤销</Tag>
      } else if (record.acceptStatus === 4) {
        return <Tag color="orange">处理中</Tag>
      }
    }
    const getBtns = record => {
      if (record.acceptStatus === 2) {
        return [
          <Button type="link" size="small" onClick={() => this.onEditClick(record)}>
            编辑
          </Button>,
          <Button type="link" size="small" onClick={() => this._setVisibleOfModal(record, 'visibleOfDistribute')}>
            派单
          </Button>,
          <Button type="link" size="small" onClick={() => this.cancelOrder(record)}>
            撤销
          </Button>
        ]
      } else if (record.acceptStatus === 4) {
        return [
          <Button type="link" size="small" onClick={() => this.cancelOrder(record)}>
            撤销
          </Button>
        ]
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
            imgList: (text, record) => {
              return (
                <ImagePreview
                  imageUrls={record.imgList?.map(item => item.path) ?? []}
                  width={32}
                  height={32}
                />
              )
            },
            acceptStatus: (text, record) => {
              return getStatus(record)
            },
            operation: (text, record) => <Space>{getBtns(record)}</Space>
          }
        }}
      />
    )
  }
}
