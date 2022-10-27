import './assets/styles/index.scss'
import Chart from '@/components/Chart'
import { mapGetters } from 'vuex'
import { cloneDeep } from 'lodash'

export default {
  inject: ['moduleName'],
  data() {
    return ({
      option: {
        color: ['#717bbc', '#d5d9eb'],
        title: {
          textStyle: {
            fontSize: 16,
            color: '#344054',
            lineHeight: 14,
            fontWeight: 'bolder',
            fontFamily: 'Source Han Sans CN'
          },
          subtextStyle: {
            fontSize: 14,
            color: 'rgba(52,64,84)',
            lineHeight: 6,
            fontFamily: 'Source Han Sans CN',
            opacity: 0.62
          },
          textAlign: 'center',
          x: '68%',
          y: '30%'
        },
        series: [
          {
            type: 'pie',
            radius: ['70%', '90%'],
            center: ['43%', '50%'],
            hoverAnimation: false,
            startAngle: -135,
            labelLine: { show: false },
            label: { show: false },
            silent: false,
            data: []
          }
        ]
      },
      option1: {},
      option2: {},
      option3: {}
    })
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    statisticalData() {
      return this.getState('statisticalData', this.moduleName)
    }
  },
  watch: {
    'statisticalData.list'(value) {
      const option1 = cloneDeep(this.option)
      const option2 = cloneDeep(this.option)
      const option3 = cloneDeep(this.option)
      const total = value.reduce((acc, value) => {
        acc = acc + value.count

        return acc
      }, 0)

      option1.title.text = value[0]?.percent
      option1.title.subtext = value[0]?.fullName
      option1.series[0].data = [
        {
          value: value[0]?.count,
          itemStyle: { borderRadius: '50%' }
        },
        { value: total }
      ]
      this.option1 = option1

      option2.title.text = value[1]?.percent
      option2.title.subtext = value[1]?.fullName
      option2.series[0].data = [
        {
          value: value[1]?.count,
          itemStyle: { borderRadius: '50%' }
        },
        { value: total }
      ]
      this.option2 = option2

      option3.title.text = value[2]?.percent
      option3.title.subtext = value[2]?.fullName
      option3.series[0].data = [
        {
          value: value[2]?.count,
          itemStyle: { borderRadius: '50%' }
        },
        { value: total }
      ]
      this.option3 = option3
    }
  },
  async created() {
    await this.$store.dispatch('getListForSelect', {
      moduleName: this.moduleName,
      stateName: 'statisticalData',
      customApiName: 'getComplaintCountByStatus'
    })
  },
  render() {
    return (
      <div class={'overview-right'}>
        <Chart
          option={this.option1}
          notMerge={true}
        />
        <Chart
          option={this.option2}
          notMerge={true}
        />
        <Chart
          option={this.option3}
          notMerge={true}
        />
      </div>
    )
  }
}
