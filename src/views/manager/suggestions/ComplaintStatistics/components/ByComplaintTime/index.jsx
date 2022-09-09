import './index.scss'
import BNContainer from '@/components/BNContainer'
import { Select, Spin } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import Chart from '@/components/Chart'

export default {
  inject: ['moduleName'],
  data() {
    return ({
      option: {
        color: ['#2b8ef3'],
        tooltip: {
          trigger: 'axis',
          axisPointer: { type: 'shadow' }
        },
        grid: {
          top: '3%',
          left: '1%',
          right: '1%',
          bottom: '1%',
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
            margin: 10,
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
    })
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    years() {
      return this.getState('years', this.moduleName)
    },
    selectedYear: {
      get() {
        return this.getState('selectedYear', this.moduleName)
      },
      async set(value) {
        this.$store.commit('setDetails', {
          value,
          moduleName: this.moduleName,
          stateName: 'selectedYear'
        })

        await this.getList()
      }
    },
    complaintStatisticsByYears() {
      return this.getState('complaintStatisticsByYears', this.moduleName)
    }
  },
  watch: {
    'complaintStatisticsByYears.list'(value) {
      const xAxis = []
      const yAxis = []

      value.map(item => {
        xAxis.push(item.fullName)
        yAxis.push(item.count)
      })

      this.option.xAxis.data = xAxis
      this.option.series = [
        {
          name: '',
          type: 'bar',
          data: yAxis
        }
      ]
    }
  },
  async created() {
    const status = await this.$store.dispatch('getListForSelect', {
      moduleName: this.moduleName,
      stateName: 'years',
      customApiName: 'getYearsOfComplaintStatistics'
    })

    if (status) {
      this.selectedYear = this.years.list?.[0] ?? undefined
    }
  },
  methods: {
    async getList() {
      await this.$store.dispatch('getListForSelect', {
        moduleName: this.moduleName,
        stateName: 'complaintStatisticsByYears',
        customApiName: 'getComplaintCountByTime',
        payload: { year: this.selectedYear }
      })
    }
  },
  render() {
    return (
      <BNContainer
        modalTitle={
          <div class={'bnm-cs-by-complaint-time'}>
            按投诉时间统计
            <Select
              vModel={this.selectedYear}
              style={{ width: '120px' }}
              placeholder={'年份'}
              notFoundContent={this.years.loading ? <Spin /> : null}
              options={this.years.list.map(item => ({
                value: item,
                label: item
              }))}
            />
          </div>
        }
        width={'100%'}
      >
        <Spin spinning={this.complaintStatisticsByYears.loading}>
          <Chart option={this.option} notMerge={true} />
        </Spin>
      </BNContainer>
    )
  }
}
