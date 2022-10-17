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
            color: '#1f1f1f',
            lineHeight: 16,
            fontFamily: 'Source Han Sans CN',
            opacity: 0.7
          },
          textAlign: 'center',
          x: '50%',
          y: '55%'
        },
        tooltip: { trigger: 'item' },
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
            radius: ['30%', '50%'],
            center: ['50%', '60%'],
            roseType: 'radius',
            label: {
              show: true,
              position: 'outer',
              color: '#1f1f1f',
              fontSize: 14,
              lineHeight: 16,
              formatter: '{b} - {d}%'
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
