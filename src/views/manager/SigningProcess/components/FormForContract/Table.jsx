import './index.scss'
import { Table } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName', 'submoduleName'],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '费项',
            width: 200,
            dataIndex: 'itemName'
          },
          {
            title: '费项说明',
            dataIndex: 'description'
          },
          {
            title: '单价',
            width: 120,
            dataIndex: 'unitAmount'
          },
          {
            title: '计费方式',
            width: 120,
            dataIndex: 'priceWay'
          },
          {
            title: '优惠',
            width: 300,
            dataIndex: 'saleAmount'
          },
          {
            title: '小计',
            width: 120,
            dataIndex: 'totalAmount'
          }
        ],
        rowSelection: null,
        rowKey: 'id',
        tableLayout: 'fixed',
        dataSource: [],
        pagination: false,
        scroll: {},
        size: 'middle'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    loading() {
      return this.getState('loading', this.moduleName, this.submoduleName)
    },
    data() {
      return this.getState('data', this.moduleName, this.submoduleName)
    },
    details() {
      return this.getState('details', this.moduleName)
    }
  },
  created() {
    this.$watch(
      () => this.$store.state[this.moduleName][this.submoduleName].data,
      data => {
        this.tableProps.dataSource = data.itemList || []
      }
    )

    this.$store.dispatch('getList', {
      moduleName: this.moduleName,
      submoduleName: this.submoduleName,
      stateName: 'data',
      additionalQueryParameters: { id: this.details.id }
    })
  },
  methods: {},
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.loading
      }
    }

    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...attributes}
        {...{
          scopedSlots: {
            footer: () => (
              <div class={'bnm-contract-confirmation-table-footer'}>
                <span>费用汇总</span>
                <span>{this.data.itemDescription}</span>
              </div>
            )
          }
        }}
      />
    )
  }
}
