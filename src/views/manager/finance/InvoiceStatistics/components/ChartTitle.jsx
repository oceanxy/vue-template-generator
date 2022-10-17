import '../assets/styles/index.scss'
import { Select, Spin } from 'ant-design-vue'
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
      customApiName: 'getChartYearsOfInvoiceStatistics'
    })

    if (status && this.years.list.length) {
      this.chartYear = this.years.list[0]
    }
  },
  render() {
    return (
      <div>
        开票金额统计
        <span
          style={{
            fontSize: '14px',
            marginLeft: 'auto',
            color: '#999999'
          }}
        >
          单位：元
        </span>
        <Select
          vModel={this.chartYear}
          style={{ width: '120px' }}
          placeholder={'年份'}
          notFoundContent={this.years.loading ? <Spin /> : null}
        >
          {
            this.years.list.map(item => <Select.Option value={item}>{item}</Select.Option>)
          }
        </Select>
      </div>
    )
  }
}
