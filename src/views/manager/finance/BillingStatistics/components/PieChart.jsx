import Chart from '@/components/Chart'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
  data() {
    return {
      option: {
        color: ['#597ef7', '#fa8c16', '#fadb14', '#36cfc9', '#a0d911', '#40a9ff'],
        title: {
          text: '账单合计',
          textStyle: {
            fontSize: '.85em',
            color: '#262626',
            lineHeight: 16,
            fontFamily: 'Source Han Sans CN',
            opacity: 0.7
          },
          textAlign: 'center',
          x: '49.5%',
          y: '56%'
        },
        tooltip: { trigger: 'item' },
        legend: {
          top: 10,
          left: 'center',
          itemGap: 30,
          textStyle: {
            color: '#8c8c8c',
            fontSize: '.8em'
          },
          data: []
        },
        series: [
          {
            type: 'pie',
            radius: ['30%', '50%'],
            center: ['center', '60%'],
            roseType: 'radius',
            label: {
              show: true,
              position: 'outer',
              color: '#1f1f1f',
              fontSize: '.85em',
              lineHeight: 16,
              formatter: '{b}\n{d}%'
            },
            data: [1, 2]
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    chartYear() {
      return this.getState('chartYear', this.moduleName)
    },
    list() {
      const list = this.getState('list', this.moduleName)

      return list.slice(0, list.length - 1)
    }
  },
  watch: {
    list: {
      immediate: true,
      handler(value) {
        this.option.series[0].data = value?.map(item => {
          this.option.legend.data.push(item.itemName)

          return {
            name: item.itemName,
            value: item.totalAmount
          }
        })
      }
    }
  },
  render() {
    return (
      <Chart
        option={this.option}
        notMerge={true}
      />
    )
  }
}
