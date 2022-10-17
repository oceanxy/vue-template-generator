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
            width: 100,
            dataIndex: 'parkNo'
          },
          {
            title: '名称',
            dataIndex: 'fullName'
          },
          {
            title: '地址',
            width: 220,
            scopedSlots: { customRender: 'address' }
          },
          {
            title: '监管单位',
            width: 220,
            dataIndex: 'regulationUnitNames'
          },
          {
            title: '状态',
            align: 'center',
            width: 100,
            fixed: 'right',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 140,
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
            address: (text, record) => `${record.provinceName}${record.cityName}${record.countyName}${record.address}`,
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
