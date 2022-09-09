import '../assets/styles/index.scss'
import { Button, Space, Table, Modal, Switch } from 'ant-design-vue'
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
            title: '图片',
            dataIndex: 'imgList',
            width: 120,
            scopedSlots: { customRender: 'imgList' }
          },
          {
            title: '房号',
            width: 80,
            dataIndex: 'roomNo'
          },
          {
            title: '地址',
            dataIndex: 'address'
          },
          {
            title: '配套设施',
            dataIndex: 'supportFacilityStr'
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
    async onDetailsClick(record) {
      await this.$router.push({
        name: 'contractReviewDetails',
        query: {
          cid: record.id // contractID
        }
      })
    },
    onDel(record) {
      Modal.confirm({
        title: '确认',
        content: '确定要删除吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: async close => {
          const res = await this.delConferenceRoomManage({ id: record.id })

          if (res.status) {
            this.fetchList()
          }

          close()
        }
      })
    },
    async onStatusChange(status, record) {
      const res = await this.updateStatus({
        id: record.id,
        status
      })

      if (res.status) {
        this.fetchList()
      }
    },
    ...mapAction(['delConferenceRoomManage', 'updateStatus'])
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
            imgList: (text, record) => {
              return (
                <ImagePreview
                  imageUrls={record.imgList?.map(item => item.path) ?? []}
                  width={32}
                  height={32}
                />
              )
            },
            status: (text, record) => {
              return (
                <Switch
                  checked={record.status === 1}
                  onclick={() => this.onStatusChange(record.status === 1 ? 2 : 1, record)}></Switch>
              )
            },
            operation: (text, record) => (
              <Space>
                <Button type="link" size="small" onClick={() => this.onEditClick(record)}>
                  编辑
                </Button>
                <Button type="link" size="small" onClick={() => this.onDel(record)}>
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
