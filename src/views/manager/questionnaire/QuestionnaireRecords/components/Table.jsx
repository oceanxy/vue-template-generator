import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable],
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
            title: '问卷标题',
            dataIndex: 'questionnaireName'
          },
          {
            title: '填写企业名称',
            dataIndex: 'companyName'
          },
          {
            title: '负责人',
            dataIndex: 'dutyPerson'
          },
          {
            title: '联系电话',
            dataIndex: 'phone'
          },
          {
            title: '填写时间',
            dataIndex: 'createTimeStr'
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
            operation: (text, record) => (
              <Space class="operation-space">
                <Button type="link" size="small" onClick={() => this._setVisibleOfModal(record, 'visibleOfResults')}>
                  查看结果
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
