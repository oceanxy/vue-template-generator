import './index.scss'
import BNContainer from '@/components/TGModule'
import Chart from '@/components/Chart'
import { Spin } from 'ant-design-vue'
import Title from '../Title'
import { getGradeStr } from '@/utils/projectHelpers'

export default {
  inject: ['moduleName'],
  data() {
    return ({
      option: {
        color: ['#16b364'],
        tooltip: { trigger: 'item' },
        grid: {
          top: '5%',
          left: '2%',
          right: '2%',
          bottom: '2%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          data: []
        },
        yAxis: { type: 'value' },
        series: [
          {
            type: 'line',
            data: [],
            smooth: true,
            areaStyle: {
              color: {
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: 'rgba(22,179,100,0.3)'
                  },
                  {
                    offset: 1,
                    color: 'rgba(22,179,100,0)'
                  }
                ]
              }
            }

          }
        ]
      }
    })
  },
  computed: {
    othersType() {
      return this.$store.state[this.moduleName].othersType
    },
    dataSource() {
      return this.$store.state[this.moduleName].others
    },
    search() {
      return this.$store.state[this.moduleName].search
    }
  },
  watch: {
    async othersType() {
      await this.getList()
    },
    'dataSource.list'(value) {
      const xAxis = []
      const data = []

      value.forEach(item => {
        xAxis.push(getGradeStr(item.grade))
        data.push(item.totalNum)
      })

      this.option.xAxis.data = xAxis
      this.option.series[0].data = data
    },
    search: {
      deep: true,
      async handler() {
        await this.getList()
      }
    }
  },
  methods: {
    async getList() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        stateName: 'others',
        payload: { activityId: this.search.activityId, othersType: this.othersType },
        customApiName: 'getOthersData'
      })
    }
  },
  render() {
    return (
      <BNContainer
        width={'100%'}
        modalTitle={<Title />}
        class={'pe-console-others'}
      >
        <Spin spinning={this.dataSource.loading}>
          <Chart
            option={this.option}
            notMerge={true}
          />
        </Spin>
      </BNContainer>
    )
  }
}