import '../assets/styles/index.scss'
import { Button, Rate, Space, Switch, Table } from 'ant-design-vue'
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
            width: 100,
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
            title: '部门',
            width: 150,
            dataIndex: 'organName'
          },
          {
            title: '性别',
            align: 'center',
            width: 80,
            dataIndex: 'genderStr'
          },
          {
            title: '年龄',
            align: 'center',
            width: 80,
            dataIndex: 'age'
          },
          {
            title: '登录账号',
            width: 160,
            dataIndex: 'loginName'
          },
          {
            title: '手机号码',
            width: 160,
            dataIndex: 'mobile'
          },
          {
            title: '待处理投诉',
            width: 100,
            align: 'center',
            dataIndex: 'waitNum'
          },
          {
            title: '已处理投诉',
            width: 100,
            align: 'center',
            dataIndex: 'acceptNum'
          },
          {
            title: '工单转出',
            width: 100,
            align: 'center',
            dataIndex: 'transferOutNum'
          },
          {
            title: '工单转入',
            width: 100,
            align: 'center',
            dataIndex: 'transferInNum'
          },
          {
            title: '服务星级',
            width: 150,
            fixed: 'right',
            scopedSlots: { customRender: 'serviceStar' }
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
            headPortrait: (text, record) => (
              <ImagePreview
                imageUrls={record.headPortraitStr ? [record.headPortraitStr] : []}
                width={32}
                height={32}
              />
            ),
            serviceStar: (text, record) => (
              <Rate
                value={record.serviceStar}
                count={5}
                disabled
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
