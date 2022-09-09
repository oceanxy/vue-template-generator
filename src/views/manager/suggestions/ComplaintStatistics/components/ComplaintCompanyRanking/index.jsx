import { mapGetters } from 'vuex'
import { Button, Table } from 'ant-design-vue'
import forModuleName from '@/mixins/forModuleName'
import forTable from '@/mixins/forTable'

export default {
  name: 'ComplaintStatistics-ComplaintCompanyRanking',
  mixins: [
    forModuleName(true),
    forTable(true, false)
  ],
  data() {
    return {
      tableProps: {
        rowSelection: null,
        columns: [
          {
            title: '排行',
            align: 'center',
            width: 60,
            scopedSlots: { customRender: 'ranking' }
          },
          {
            title: '投诉企业',
            dataIndex: 'fullName'
          },
          {
            title: '投诉次数',
            dataIndex: 'totalNum',
            align: 'center',
            width: 80
          },
          {
            title: '待处理数',
            dataIndex: 'waitNum',
            align: 'center',
            width: 80
          },
          {
            title: '已处理数',
            dataIndex: 'acceptNum',
            align: 'center',
            width: 80
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    loading() {
      return this.getState('loading', this.moduleName, this.submoduleName)
    },
    list() {
      return this.getState('list', this.moduleName, this.submoduleName)
    },
    pagination() {
      return this.getState('pagination', this.moduleName, this.submoduleName)
    },
    additionalQueryParameters() {
      return this.pagination
    }
  },
  async created() {
    await this.loadMore(0)
  },
  methods: {
    /**
     * 加载数据
     * @param pageIndex {number} 请求页码
     * @returns {Promise<void>}
     */
    async loadMore(pageIndex) {
      this.$store.commit('setPagination', {
        value: {
          ...this.pagination,
          pageIndex: !isNaN(pageIndex) ? pageIndex : (this.pagination.pageIndex + 1)
        },
        moduleName: this.moduleName,
        submoduleName: this.submoduleName
      })

      await this.fetchList(isNaN(pageIndex))
    }
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName, this.submoduleName)
      }
    }

    return (
      <div class={'ranking'}>
        <Table
          ref={`${this.submoduleName}Of${this.moduleName}Table`}
          {...attributes}
          {...{
            scopedSlots: {
              ranking: (text, record) => (
                <span class={`ranking-common ranking-${record.rank}`}>{record.rank}</span>
              )
            }
          }}
        />
        {
          (this.pagination.pageIndex + 1) * this.pagination.pageSize <= this.pagination.total
            ? (
              <div class={'btn-container'}>
                <Button onClick={this.loadMore}>加载更多</Button>
              </div>)
            : null
        }
      </div>
    )
  }
}
