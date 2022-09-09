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
        title: {
          textStyle: {
            fontSize: 20,
            color: '#1f1f1f',
            lineHeight: 16,
            fontFamily: 'Source Han Sans CN',
            opacity: 0.7
          },
          subtextStyle: {
            fontSize: 14,
            color: '#8c8c8c',
            lineHeight: 10,
            fontFamily: 'Source Han Sans CN',
            opacity: 0.7
          },
          textAlign: 'center',
          x: '54%',
          y: '34%'
        },
        series: [
          {
            type: 'pie',
            radius: ['65%', '90%'],
            center: ['55%', '50%'],
            hoverAnimation: false,
            startAngle: -135,
            labelLine: { show: false },
            label: { show: false },
            silent: true,
            data: []
          }
        ]
      },
      option1: {},
      option2: {}
    })
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    complaintStatisticsByStatus() {
      return this.getState('complaintStatisticsByStatus', this.moduleName)
    }
  },
  watch: {
    'complaintStatisticsByStatus.list'(value) {
      const option1 = cloneDeep(this.option)
      const option2 = cloneDeep(this.option)

      option1.color = ['#3595ff', '#ebf4fd']
      option1.title.text = value[0]?.percent
      option1.title.subtext = value[0]?.fullName
      option1.series[0].data = [
        {
          value: value[0]?.count,
          itemStyle: { borderRadius: '50%' }
        },
        { value: value[1]?.count }
      ]
      this.option1 = option1

      option2.color = ['#fa8c16', '#fff2e8']
      option2.title.text = value[1]?.percent
      option2.title.subtext = value[1]?.fullName
      option2.series[0].data = [
        {
          value: value[1]?.count,
          itemStyle: { borderRadius: '50%' }
        },
        { value: value[0]?.count }
      ]
      this.option2 = option2
    }
  },
  async created() {
    await this.$store.dispatch('getListForSelect', {
      moduleName: this.moduleName,
      stateName: 'complaintStatisticsByStatus',
      customApiName: 'getComplaintCountByStatus'
    })
  },
  render() {
    return (
      <BNContainer
        contentClass={'bnm-cs-by-complaint-status'}
        modalTitle={'按投诉状态统计'}
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
          loading={this.complaintStatisticsByStatus.loading}
          dataSource={this.complaintStatisticsByStatus.list}
        />
        <div class={'charts'}>
          <Chart
            class={'chart'}
            option={this.option1}
            notMerge={true}
          />
          <Chart
            class={'chart'}
            option={this.option2}
            notMerge={true}
          />
        </div>
      </BNContainer>
    )
  }
}
