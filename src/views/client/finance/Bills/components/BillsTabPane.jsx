import { Button, Table, Tag } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  mixins: [forTable(true, false)],
  props: {
    dataSource: {
      type: Array,
      default: () => []
    }
  },
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
            title: '账单类型',
            width: 120,
            dataIndex: 'itemName'
          },
          {
            title: '月份',
            width: 120,
            dataIndex: 'billDate'
          },
          {
            title: '场地',
            width: 80,
            dataIndex: 'address'
          },
          {
            title: '企业',
            dataIndex: 'companyName'
          },
          {
            title: '金额',
            width: 100,
            dataIndex: 'realAmount'
          },
          {
            title: '结清状态',
            width: 80,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            width: 60,
            align: 'center',
            scopedSlots: { customRender: 'operation' }
          }
        ],
        dataSource: []
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    loading() {
      return this.getState('loading', this.moduleName)
    }
  },
  created() {
    this.$watch(
      () => this.$store.state[this.moduleName].details,
      async () => {
        this.resize()
      },
      { root: true }
    )
  },
  methods: {
    async onPay(record) {
      await this._setVisibleOfModal(record, 'visibleOfPayFees')
    }
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.loading,
        dataSource: this.dataSource
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
              <Tag
                color={[
                  'red',
                  '#1a64bf',
                  '#1abf36',
                  '#bf661a',
                  '#a3a2a5'
                ][record.payStatus - 1]}
              >
                {record.payStatusStr}
              </Tag>
            ),
            operation: (text, record) => {
              return record.payStatus === 1
                ? (
                  <Button
                    type={'link'}
                    onClick={() => this.onPay(record)}
                  >
                    缴费
                  </Button>
                )
                : null
            }
          }
        }}
      />
    )
  }
}
