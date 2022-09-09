import './index.scss'
import BNContainer from '@/components/BNContainer'
import Chart from '@/components/Chart'
import { mapGetters } from 'vuex'
import { Table } from 'ant-design-vue'
import { cloneDeep } from 'lodash'

export default {
  inject: ['moduleName'],
  data() {
    return ({
      option: {
        color: ['#597ef7', '#fa8c16', '#a0d911', '#fadb14'],
        title: {
          text: '占比',
          textStyle: {
            fontSize: 16,
            color: '#1f1f1f',
            lineHeight: 16,
            fontFamily: 'Source Han Sans CN',
            opacity: 0.7
          },
          textAlign: 'center',
          x: '44%',
          y: '45%'
        },
        tooltip: { trigger: 'item' },
        legend: {
          top: 'center',
          right: -5,
          orient: 'vertical',
          textStyle: {
            color: '#8c8c8c',
            fontSize: 14
          }
        },
        series: [
          {
            type: 'pie',
            radius: ['45%', '65%'],
            center: ['45%', '50%'],
            roseType: 'radius',
            label: {
              show: true,
              position: 'outer',
              color: '#1f1f1f',
              fontSize: 14,
              lineHeight: 16,
              formatter: '{b}\n{d}%'
            },
            data: []
          }
        ]
      }
    })
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    complaintStatisticsByType() {
      return this.getState('complaintStatisticsByType', this.moduleName)
    }
  },
  watch: {
    'complaintStatisticsByType.list'(value) {
      const option = cloneDeep(this.option)
      const legend = []
      const data = []

      value.forEach(item => {
        legend.push(item.fullName)
        data.push({
          name: item.fullName,
          value: item.count
        })
      })

      option.series[0].data = data
      this.option = option
    }
  },
  async created() {
    await this.$store.dispatch('getListForSelect', {
      moduleName: this.moduleName,
      stateName: 'complaintStatisticsByType',
      customApiName: 'getComplaintCountByType'
    })
  },
  render() {
    return (
      <BNContainer
        contentClass={'bnm-cs-by-complaint-type'}
        modalTitle={'按投诉类型统计'}
        width={'100%'}
      >
        <Table
          size={'small'}
          rowKey={'id'}
          tableLayout={'fixed'}
          pagination={false}
          class={'table'}
          columns={[
            {
              title: '统计项',
              dataIndex: 'fullName'
            },
            {
              title: '数量',
              dataIndex: 'count'
            },
            {
              title: '占比',
              dataIndex: 'percent'
            }
          ]}
          loading={this.complaintStatisticsByType.loading}
          dataSource={this.complaintStatisticsByType.list}
        />
        <Chart
          class={'chart'}
          option={this.option}
          notMerge={true}
        />
      </BNContainer>
    )
  }
}
