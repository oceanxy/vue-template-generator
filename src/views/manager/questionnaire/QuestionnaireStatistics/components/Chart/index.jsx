import Chart from '@/components/Chart'
import './index.scss'

export default {
  props: {
    dataSource: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      option: {
        color: ['#597ef7', '#fa8c16', '#fadb14', '#36cfc9', '#a0d911', '#40a9ff'],
        title: {
          text: '',
          textStyle: {
            fontSize: 12,
            color: '#ffffff',
            lineHeight: 16,
            fontFamily: 'Source Han Sans CN',
            opacity: 0.7
          },
          textAlign: 'center',
          x: '48%',
          y: '49%'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          top: 10,
          left: 'center',
          textStyle: {
            color: '#8c8c8c',
            fontSize: 14
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['30%', '60%'],
            center: ['center', '60%'],
            roseType: 'radius',
            label: {
              show: true,
              position: 'outer',
              color: '#1f1f1f',
              fontFamily: 'PingFang SC',
              fontSize: 14,
              lineHeight: 16,
              formatter: '{b}\n{d}%'
            },
            data: []
          }
        ]
      }
    }
  },
  watch: {
    dataSource: {
      immediate: true,
      handler() {
        this.option.title.text = this.dataSource.fullName
        this.option.series[0].data = this.dataSource.countList?.map(item => ({
          name: item.fullName,
          value: item.count
        }))
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
