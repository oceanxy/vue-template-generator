import Chart from '@/components/Chart'

export default {
  inject: ['moduleName'],
  data() {
    return ({
      option: {
        series: [
          {
            type: 'pie',
            label: {
              show: true,
              fontSize: 16,
              fontWeight: 'bold',
              color: '#344054',
              position: 'center',
              formatter: [
                '{a|{b}}',
                '{b|整体完成率}',
                '{c|}'
              ].join('\n'),
              rich: {
                a: {
                  color: '#344054',
                  fontWeight: 'bold',
                  fontSize: 24
                },
                b: {
                  color: '#344054',
                  fontWeight: 'bold',
                  fontSize: 16,
                  lineHeight: 40
                },
                c: {
                  color: 'transparent',
                  lineHeight: 50
                }
              }
            },
            center: ['50%', '100%'],
            radius: ['160%', '200%'],
            startAngle: 180,
            // 初始化样式
            data: [
              {
                name: '0%',
                value: 0,
                itemStyle: { color: '#d3f8df' }
              },
              {
                value: 0,
                itemStyle: { color: 'transparent' }
              }
            ]
          }
        ]
      }
    })
  },
  computed: {
    dataSource() {
      return this.$store.state[this.moduleName].list.endDataVO
    }
  },
  watch: {
    dataSource() {
      const ratio = +this.dataSource.totalEndPercent.replace('%', '') / 100
      const total = this.dataSource.endStudentNum / ratio

      this.option.series[0].data = [
        {
          name: this.dataSource.totalEndPercent,
          value: this.dataSource.endStudentNum,
          itemStyle: { color: '#16b364' }
        },
        {
          name: this.dataSource.totalEndPercent,
          value: total - this.dataSource.endStudentNum,
          emphasis: { disabled: true },
          itemStyle: { color: '#d3f8df' }
        },
        {
          name: this.dataSource.totalEndPercent,
          value: total,
          itemStyle: { color: 'transparent' }
        }
      ]
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
