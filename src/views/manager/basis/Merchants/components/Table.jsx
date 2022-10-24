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
            title: '头像',
            width: 60,
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'headPortrait' }
          },
          {
            title: '姓名',
            fixed: true,
            width: 100,
            dataIndex: 'fullName'
          },
          {
            title: '性别',
            align: 'center',
            width: 60,
            dataIndex: 'genderStr'
          },
          {
            title: '手机号码',
            width: 120,
            dataIndex: 'mobile'
          },
          {
            title: '身份证号码',
            width: 160,
            dataIndex: 'idCard'
          },
          {
            title: '邮箱',
            width: 160,
            dataIndex: 'email'
          },
          {
            title: '所在团队',
            width: 140,
            dataIndex: 'teamName'
          },
          // {
          //   title: '状态',
          //   align: 'center',
          //   fixed: 'right',
          //   width: 80,
          //   scopedSlots: { customRender: 'status' }
          // },
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
            serialNumber: (text, record, index) => index + 1 + this.serialNumber,
            // status: (text, record) => (
            //   <Switch
            //     checked={+record.status === 1}
            //     onChange={checked => this.onStatusChange({ checked, record })}
            //   />
            // ),
            headPortrait: (text, record) => (
              <ImagePreview
                imageUrls={record.headPortraitStr ? [record.headPortraitStr] : []}
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
