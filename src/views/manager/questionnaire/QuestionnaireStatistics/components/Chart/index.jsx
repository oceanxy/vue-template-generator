import Chart from '@/components/Chart'
import './index.scss'

export default {
  data() {
    return {
      loading: false,
      option: {
        color: ['#597ef7', '#fa8c16', '#fadb14', '#36cfc9', '#a0d911', '#40a9ff'],
        title: {
          text: '人口\n性别分布',
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
            color: '#8C8C8C',
            fontSize: 14
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['30%', '70%'],
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
            data: [
              {
                name: '1214234325432',
                value: 20
              },
              {
                name: '3253253252',
                value: 29
              },
              {
                name: '332523543',
                value: 49
              },
              {
                name: '436346464',
                value: 39
              },
              {
                name: '436346367',
                value: 19
              },
              {
                name: '35346346',
                value: 69
              }
            ]
          }
        ]
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
