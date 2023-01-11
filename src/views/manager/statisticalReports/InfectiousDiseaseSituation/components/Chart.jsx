import Chart from '@/components/Chart'

export default {
  render() {
    return (
      <Chart
        style={{ minHeight: '500px' }}
        option={{
          title: {
            text: 'Stacked Line'
          },
          tooltip: {
            trigger: 'axis'
          },
          grid: {
            left: '10%',
            right: '10%',
            bottom: '10%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name: 'Email',
              barWidth: '20%',
              type: 'bar',
              data: [120, 132, 101, 134, 90, 230, 210]
            }
          ]
        }}
      />
    )
  }
}
