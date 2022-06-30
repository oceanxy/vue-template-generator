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
            title: '头像',
            width: 60,
            align: 'center',
            scopedSlots: { customRender: 'headPortrait' }
          },
          {
            title: '姓名',
            dataIndex: 'fullName'
          },
          {
            title: '性别',
            align: 'center',
            dataIndex: 'genderStr'
          },
          {
            title: '手机号码',
            dataIndex: 'mobile'
          },
          {
            title: '身份证号码',
            dataIndex: 'idCard'
          },
          {
            title: '邮箱',
            dataIndex: 'email'
          },
          {
            title: '所在团队',
            dataIndex: 'teamName'
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
                onChange={checked => this.onStatusChange(checked, record)}
              />
            ),
            headPortrait: (text, record) => (
              <img src={record.headPortraitStr} alt={''} class={'bnm-table-img'} />
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
