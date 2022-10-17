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
            fixed: true,
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '图片',
            dataIndex: 'headPortraitStr',
            width: 120,
            align: 'center',
            scopedSlots: { customRender: 'headPortraitStr' }
          },
          {
            title: '姓名',
            width: 100,
            dataIndex: 'fullName'
          },
          {
            title: '性别',
            width: 80,
            align: 'center',
            dataIndex: 'genderStr'
          },
          {
            title: '手机号码',
            width: 120,
            dataIndex: 'mobile'
          },
          {
            title: '身份证号',
            width: 200,
            dataIndex: 'idCard'
          },
          {
            title: '邮箱',
            width: 200,
            dataIndex: 'email'
          },
          // {
          //   title: '所在单位',
          //   dataIndex: 'unitName'
          // },
          {
            title: '状态',
            width: 80,
            fixed: 'right',
            align: 'center',
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
            serialNumber: (text, record, index) => {
              return <span>{index + 1}</span>
            },
            headPortraitStr: (text, record) => {
              return (
                <ImagePreview
                  imageUrls={record.headPortraitStr ? [record.headPortraitStr] : []}
                  width={32}
                  height={32}
                />
              )
            },
            status: (text, record) => {
              return (
                <Switch
                  checked={record.status === 1}
                  onChange={checked => this.onStatusChange({ checked, record })}
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
