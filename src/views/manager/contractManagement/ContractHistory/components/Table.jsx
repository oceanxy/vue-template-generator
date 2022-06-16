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
            dataIndex: ''
          },
          {
            title: '企业名称',
            dataIndex: 'appName'
          },
          {
            title: '类型',
            dataIndex: 'remark'
          },
          {
            title: '场地/期限',
            align: 'center',
            dataIndex: 'zz'
          },
          {
            title: '费用/优惠',
            align: 'center',
            dataIndex: 'xx'
          },
          {
            title: '签约人',
            align: 'center',
            dataIndex: 'ccc'
          },
          {
            title: '状态',
            align: 'center',
            width: 60,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '签约合同',
            align: 'center',
            dataIndex: 'cc'
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 150,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    onDetailsClick(record) {
      this.$router.push({ name: 'contractReviewDetails' })
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
            // status: (text, record) => (
            //   <Switch
            //     checked={+record.status === 1}
            //     onChange={checked => this.onStatusChange(checked, record)}
            //   />
            // ),
            operation: (text, record) => (
              <Space class="operation-space">
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onDetailsClick(record)}
                >
                  签约详情
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfContractReview')}
                >
                  用印
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
