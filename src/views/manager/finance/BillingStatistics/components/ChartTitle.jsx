import '../assets/styles/index.scss'
import { Spin, TreeSelect } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    chartYear: {
      get() {
        return this.getState('chartYear', this.moduleName)
      },
      set(value) {
        this.$store.commit('setDetails', {
          value,
          moduleName: this.moduleName,
          stateName: 'chartYear'
        })
      }
    },
    years() {
      return this.getState('years', this.moduleName)
    }
  },
  async created() {
    const status = await this.$store.dispatch('getListForSelect', {
      moduleName: this.moduleName,
      stateName: 'years',
      customApiName: 'getChartYearsOfBillingStatistics'
    })

    if (status && this.years.list.length) {
      this.chartYear = this.years.list?.[0].dateVal
    }
  },
  render() {
    return (
      <div>
        按时间统计
        <span
          style={{
            fontSize: '14px',
            marginLeft: 'auto',
            color: '#999999'
          }}
        >
          单位：元
        </span>
        <Spin spinning={this.years.loading}>
          <TreeSelect
            allowClear
            vModel={this.chartYear}
            style={{ width: '120px' }}
            placeholder={'年份/月份'}
            treeData={this.years.list}
            replaceFields={{
              children: 'childrenList',
              title: 'dateName',
              key: 'id',
              value: 'dateVal'
            }}
          />
        </Spin>
      </div>
    )
  }
}
