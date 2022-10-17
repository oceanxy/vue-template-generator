import '../assets/styles/index.scss'
import { Empty, Select, Spin } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    search: {
      get() {
        return this.getState('search', this.moduleName)
      },
      set(value) {
        this.setSearch(value)
      }
    },
    reports() {
      return this.getState('reports', this.moduleName)
    },
    years() {
      return this.getState('years', this.moduleName)
    },
    items() {
      return this.getState('items', this.moduleName)
    }
  },
  watch: {
    'items.list'(value) {
      if (value.length) {
        this.setSearch({ itemId: value[0].id })
      } else {
        this.setSearch({ itemId: undefined })
      }
    },
    'years.list'(value) {
      if (value.length) {
        this.setSearch({ year: value[0] })
      } else {
        this.setSearch({ year: undefined })
      }
    }
  },
  async created() {
    let reportId = this.$route.query?.reportId

    if (reportId) {
      this.setSearch()

      await Promise.all([
        this.getReports(),
        this.getYears(reportId),
        this.getItemsOfReport(reportId)
      ])
    } else {
      const status = await this.getReports()

      if (status && this.reports.list.length) {
        reportId = this.reports.list[0].id

        this.setSearch({ reportId })

        await Promise.all([
          this.getYears(reportId),
          this.getItemsOfReport(reportId)
        ])
      }
    }
  },
  methods: {
    setSearch(value) {
      this.$store.commit('setSearch', {
        moduleName: this.moduleName,
        payload: { ...(value || this.$route.query) }
      })
    },
    async getReports() {
      return await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'reports',
        customApiName: 'getReportsForSelect'
      })
    },
    async getYears(reportId) {
      // await this.$store.dispatch('getListForSelect', {
      //   moduleName: this.moduleName,
      //   stateName: 'years',
      //   customApiName: 'getYearsForSelect',
      //   payload: { reportId }
      // })
    },
    async getItemsOfReport(reportId) {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'items',
        customApiName: 'getItemsOfTemplateById',
        payload: { reportId }
      })
    },
    async onReportChange(value) {
      await Promise.all([
        this.getItemsOfReport(value),
        this.getYears(value)
      ])
    }
  },
  render() {
    return (
      <div class={'bnm-indicator-statistics-sider'}>
        <div class={'selects'}>
          <Select
            vModel={this.search.reportId}
            placeholder={'请选择报表'}
            class={'list-select'}
            notFoundContent={this.reports.loading ? <Spin /> : undefined}
            onChange={this.onReportChange}
          >
            {
              this.reports.list.map(item => (
                <Select.Option
                  value={item.id}
                  title={item.fullName}
                >
                  {item.fullName}
                </Select.Option>
              ))
            }
          </Select>
          {/*<Select*/}
          {/*  vModel={this.search.year}*/}
          {/*  placeholder={'请选择年份'}*/}
          {/*  class={'list-select'}*/}
          {/*  allowClear*/}
          {/*  notFoundContent={this.years.loading ? <Spin /> : undefined}*/}
          {/*  onChange={value => this.setSearch({ year: value })}*/}
          {/*>*/}
          {/*  {*/}
          {/*    this.years.list.map(item => (*/}
          {/*      <Select.Option*/}
          {/*        value={item}*/}
          {/*        title={`${item}年`}*/}
          {/*      >*/}
          {/*        {item}年*/}
          {/*      </Select.Option>*/}
          {/*    ))*/}
          {/*  }*/}
          {/*</Select>*/}
        </div>
        <div class={'list'}>
          <Spin
            spinning={this.items.loading}
            style={{ width: '100%' }}
          >
            {
              this.items.list.length
                ? this.items.list.map((item, index) => (
                  <div
                    class={`list-item${this.search.itemId === item.id ? ' checked' : ''}`}
                    onClick={() => this.setSearch({ itemId: item.id })}
                  >
                    <span>{index + 1}</span>
                    <span>{item.fullName}</span>
                  </div>
                ))
                : <Empty />
            }
          </Spin>
        </div>
      </div>
    )
  }
}
