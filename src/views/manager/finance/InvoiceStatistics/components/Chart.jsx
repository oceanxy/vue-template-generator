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
          left: '2%',
          right: '1%',
          bottom: '-10px',
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
        customApiName: 'getChartOfInvoiceStatistics',
        payload: { year: this.chartYear }
      })
    },
    setOption(value) {
      const companyName = []
      const amount = []
      const placeAmount = []
      const propertyAmount = []
      const utilityAmount = []
      const series = []

      value.list.forEach(item => {
        companyName.push(item.companyName)
        amount.push(item.amount)
        placeAmount.push(item.placeAmount)
        propertyAmount.push(item.propertyAmount)
        utilityAmount.push(item.utilityAmount)
      })

      series.push({
        name: '金额',
        type: 'line',
        label: { show: true },
        data: amount
      })
      series.push({
        name: '场地租金',
        type: 'bar',
        label: {
          show: true,
          position: 'top'
        },
        data: placeAmount
      })
      series.push({
        name: '物业费',
        type: 'bar',
        label: {
          show: true,
          position: 'top'
        },
        data: propertyAmount
      })
      series.push({
        name: '水电费',
        type: 'bar',
        label: {
          show: true,
          position: 'top'
        },
        data: utilityAmount
      })

      this.option.xAxis.data = companyName
      this.option.series = series
      this.option.legend.data = [
        { name: '金额' },
        { name: '场地租金' },
        { name: '物业费' },
        { name: '水电费' }
      ]
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
