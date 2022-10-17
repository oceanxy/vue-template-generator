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
            title: '图片',
            width: 60,
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'imgList' }
          },
          {
            title: '编号',
            width: 80,
            dataIndex: 'buildNo'
          },
          {
            title: '名称',
            width: 120,
            dataIndex: 'fullName'
          },
          {
            title: '所属中心',
            width: 200,
            dataIndex: 'parkName'
          },
          {
            title: '楼层数',
            width: 60,
            align: 'center',
            dataIndex: 'floorNum'
          },
          {
            title: '地下楼层数',
            width: 120,
            align: 'center',
            dataIndex: 'undergroundNum'
          },
          {
            title: '状态',
            align: 'center',
            fixed: 'right',
            width: 80,
            scopedSlots: { customRender: 'status' }
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
  methods: {},
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
            status: (text, record) => (
              <Switch
                checked={+record.status === 1}
                onChange={checked => this.onStatusChange({ checked, record })}
              />
            ),
            imgList: (text, record) => (
              <ImagePreview
                imageUrls={record.imgList?.map(item => item.path) ?? []}
                width={32}
                height={32}
              />
            ),
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
