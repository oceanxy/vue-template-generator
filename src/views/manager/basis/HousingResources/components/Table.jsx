import '../assets/styles/index.scss'
import { Button, Space, Switch, Table } from 'ant-design-vue'
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
            title: '房号',
            fixed: true,
            width: 60,
            dataIndex: 'roomNo'
          },
          {
            title: '图片',
            width: 60,
            align: 'center',
            scopedSlots: { customRender: 'imgList' }
          },
          {
            title: '位置',
            width: 200,
            dataIndex: 'floorNameStr'
          },
          {
            title: '面积（㎡）',
            width: 100,
            align: 'center',
            dataIndex: 'roomArea'
          },
          {
            title: '单价（㎡）',
            width: 100,
            align: 'center',
            dataIndex: 'priceStr'
          },
          {
            title: '工位数',
            width: 80,
            align: 'center',
            dataIndex: 'workstationNum'
          },
          {
            title: '配套设施',
            width: 140,
            dataIndex: 'supportFacilityStr'
          },
          {
            title: '状态',
            align: 'center',
            width: 80,
            fixed: 'right',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 200,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    async onAgencyHistoryClick(record) {
      await this._setVisibleOfModal(record, 'visibleOfContractHistory')
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
            status: (text, record) => (
              <Switch
                checked={+record.status === 1}
                onChange={checked => this.onStatusChange({
                  checked,
                  record: {
                    ...record,
                    fullName: `房号${record.roomNo}`
                  }
                })}
              />
            ),
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onAgencyHistoryClick(record)}
                >
                  签约查询
                </Button>
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
