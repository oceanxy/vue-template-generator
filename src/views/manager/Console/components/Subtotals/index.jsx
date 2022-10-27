import './index.scss'
import BNContainer from '@/components/BNContainer'
import Chart from '@/components/Chart'
import { Spin } from 'ant-design-vue'

export default {
  computed: {
    data() {
      return [
        { name: '单纯收缩期高血压', value: 100, percent: '30%' },
        { name: '正常血压', value: 100, percent: '30%' },
        { name: '正常高值血压', value: 100, percent: '30%' },
        { name: '血压偏高', value: 100, percent: '30%' }
      ]
    }
  },
  data() {
    return ({
      option: {
        color: ['#2ed3b7', '#53b1fd', '#8098f9', '#fd6f8e'],
        legend: {
          show: true,
          orient: 'vertical',
          top: 'center',
          icon: 'circle',
          right: 20,
          data: ['单纯收缩期高血压', '正常血压', '正常高值血压', '血压偏高'],
          //格式化每一项内容
          formatter: name => {
            const data = this.data.find(item => item.name === name)

            return `{name|${data.name}}：${data.value} {value|${`(${data.percent})`}}`
            // \n表示换行
          },
          //使用富文本去定义样式
          textStyle: {
            rich: {
              name: {
                fontSize: 12,
                color: 'rgba(52,64,84,0.80)'
              },
              value: {
                fontSize: 12,
                color: '#16b364'
              }
            }
          }
        },
        tooltip: {
          trigger: 'item'
        },
        grid: {
          top: '1%',
          left: '1%',
          right: '1%',
          bottom: '1%',
          containLabel: true
        },
        series: [
          {
            name: '',
            type: 'pie',
            data: [
              { name: '单纯收缩期高血压', value: 100 },
              { name: '正常血压', value: 100 },
              { name: '正常高值血压', value: 100 },
              { name: '血压偏高', value: 100 }
            ],
            radius: ['70%', '90%'],
            center: ['30%', '50%'],
            hoverAnimation: true,
            labelLine: { show: false },
            label: { show: false },
            silent: false,
            itemStyle: {
              borderColor: '#ffffff',
              borderWidth: 2
            }
          },
          {
            name: '',
            type: 'pie',
            data: [
              { name: '单纯收缩期高血压', value: 100 },
              { name: '正常血压', value: 100 },
              { name: '正常高值血压', value: 100 },
              { name: '血压偏高', value: 100 }
            ],
            radius: ['49.7%', '69.7%'],
            center: ['30%', '50%'],
            hoverAnimation: false,
            labelLine: { show: false },
            label: { show: false },
            silent: true,
            itemStyle: {
              borderColor: '#ffffff',
              borderWidth: 2,
              opacity: .2
            }
          }
        ]
      }
    })
  },
  render() {
    return (
      <div class={'pe-console-subtotals'}>
        <BNContainer
          width={'100%'}
          modalTitle={'血压数据总览'}
        >
          <Spin spinning={false}>
            <Chart
              option={this.option}
              notMerge={true}
            />
          </Spin>
        </BNContainer>
        <BNContainer
          width={'100%'}
          modalTitle={'肺功能数据总览'}
        >
          <Spin spinning={false}>
            <Chart
              option={this.option}
              notMerge={true}
            />
          </Spin>
        </BNContainer>
      </div>
    )
  }
}
