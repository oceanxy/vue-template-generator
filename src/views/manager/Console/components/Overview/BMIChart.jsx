import Chart from '@/components/Chart'

export default {
  data() {
    return ({
      option: {
        dataset: {
          source: [
            ['BMI', 'amount', 'percent', 'label'],
            [20, 58212, '30%', '正常'],
            [17, 78254, '35%', '轻度消瘦'],
            [13, 41032, '27%', '中重度消瘦'],
            [27, 12755, '59%', '超重'],
            [38, 20145, '78%', '肥胖']
          ]
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' },
          formatter: params => {
            const { marker, name, value } = params[0]

            return `<div>
              <div>${marker} ${name}</div>
              <div class="tooltip-name">人数：${value[1]}</div>
              <div class="tooltip-value">占比：${value[2]}</div>
            </div>`
          }
        },
        grid: {
          containLabel: true,
          bottom: '5%',
          top: '18%',
          left: '2%',
          right: 200
        },
        xAxis: { type: 'category' },
        yAxis: { name: '人数' },
        visualMap: {
          type: 'piecewise',
          orient: 'vertical',
          splitNumber: 6,
          precision: 1,
          align: 'left',
          pieces: [
            { lt: 18.5, label: '偏瘦（<18.5）' }, // 偏瘦
            { gte: 18.5, lt: 24, label: '正常（18.5 ~ 23.9）' }, // 正常
            { gte: 24, lt: 27, label: '偏胖（24 ~ 26.9）' }, // 偏胖
            { gte: 27, lt: 30, label: '肥胖（27 ~ 29.9）' }, // 肥胖
            { gte: 30, lt: 40, label: '重度肥胖（30 ~ 39.9）' }, // 重度肥胖
            { gte: 40, label: '极重度肥胖（≥40）' } // 极重度肥胖
          ],
          minOpen: true,
          maxOpen: true,
          hoverLink: true,
          right: 10,
          top: 'center',
          text: ['BMI'],
          showLabel: true,
          // Map the "BMI" column to color
          dimension: 0,
          inRange: {
            symbol: 'circle',
            color: [
              '#2ed3b7', '#16b364', '#53b1fd', '#8098f9', '#fac515', '#fd6f8e'
            ]
          }
        },
        series: [
          {
            type: 'bar',
            barWidth: 20,
            encode: {
              // Map the "label" column to X axis.
              x: 'label',
              // Map the "amount" column to Y axis
              y: 'amount'
            }
          }
        ]
      }
    })
  },
  render() {
    return (
      <Chart
        class={'overview-left'}
        option={this.option}
        notMerge={true}
      />
    )
  }
}
