import '../assets/styles/index.scss'
import { Button, Space, Switch, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

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
            width: 60,
            align: 'center',
            scopedSlots: { customRender: 'imgList' }
          },
          {
            title: '编号',
            dataIndex: 'parkNo'
          },
          {
            title: '名称',
            dataIndex: 'fullName'
          },
          {
            title: '地址',
            dataIndex: 'address'
          },
          {
            title: '监管单位',
            dataIndex: 'regulationOrganName'
          },
          {
            title: '状态',
            align: 'center',
            width: 80,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 120,
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
                onChange={checked => this.onStatusChange(checked, record)}
              />
            ),
            imgList: (text, record) => (
              <img src={record.imgList[0]?.path} alt={''} class={'bnm-table-img'} />
            ),
            operation: (text, record) => (
              <Space class="operation-space">
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
