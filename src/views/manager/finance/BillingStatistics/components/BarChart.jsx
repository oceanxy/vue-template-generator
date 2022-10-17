import Chart from '@/components/Chart'
import { mapGetters } from 'vuex'
import { Spin } from 'ant-design-vue'

export default {
  inject: ['moduleName'],
  data() {
    return {
      option: {
        color: ['#48e5e5', '#2b8ef3', '#3cd495', '#bee5fb'],
        legend: { data: [] },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        grid: {
          top: '14%',
          left: '3%',
          right: '4%',
          bottom: 0,
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: [],
          axisTick: {
            alignWithLabel: true,
            show: false
          },
          axisLabel: {
            interval: 0,
            rotate: 10,
            margin: 30,
            align: 'center'
          },
          axisLine: { lineStyle: { color: '#8c8c8c' } }
        },
        yAxis: {
          type: 'value',
          axisLine: {
            show: false,
            lineStyle: { color: '#8c8c8c' }
          }
        },
        series: []
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    chartYear() {
      return this.getState('chartYear', this.moduleName)
    },
    chartData() {
      return this.getState('chartData', this.moduleName)
    }
  },
  watch: {
    async chartYear(value) {
      if (value) {
        await this.getList()
      }
    },
    chartData: {
      deep: true,
      handler(value) {
        this.setOption(value)
      }
    }
  },
  async created() {
    if (this.chartYear) {
      await this.getList()
    }
  },
  methods: {
    async getList() {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'chartData',
        customApiName: 'getChartOfBillingStatistics',
        payload: { billDate: this.chartYear }
      })
    },
    setOption(value) {
      const xData = []
      const series = []
      const legend = []

      value.list.forEach(item => {
        xData.push(item.xData)

        item.yData.forEach((y, i) => {
          if (!legend[i]) {
            legend[i] = y.payStatusStr
          }

          if (Object.prototype.toString.call(series[i]) !== '[object Object]') {
            series[i] = {
              name: y.payStatusStr,
              type: 'bar',
              label: {
                show: true,
                position: 'top'
              },
              data: []
            }
          }

          series[i].data.push(y.amount)
        })
      })

      this.option.xAxis.data = xData
      this.option.series = series
      this.option.legend.data = legend
    }
  },
  render() {
    return (
      <Spin spinning={this.chartData.loading}>
        <Chart
          option={this.option}
          notMerge={true}
        />
      </Spin>
    )
  }
}
