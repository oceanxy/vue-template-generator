import '../assets/styles/index.scss'
import { Table } from 'ant-design-vue'
import Chart from '@/views/manager/questionnaire/QuestionnaireStatistics/components/Chart'
import BNContainer from '@/components/BNContainer'
import { mapGetters } from 'vuex'
import forIndex from '@/mixins/forIndex'

export default {
  inject: ['moduleName'],
  mixins: [forIndex],
  data() {
    return {
      tableProps: {
        rowKey: 'id',
        tableLayout: 'fixed',
        pagination: false,
        scroll: {},
        size: 'middle',
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '标题',
            width: 120,
            dataIndex: 'fullName'
          },
          {
            title: '数量',
            width: 120,
            align: 'center',
            dataIndex: 'count'
          },
          {
            title: '占比',
            align: 'center',
            width: 120,
            dataIndex: 'percent'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    search() {
      return this.getState('search', this.moduleName)
    },
    details() {
      return this.getState('details', this.moduleName)
    }
  },
  watch: {
    search: {
      deep: true,
      async handler(value) {
        if (value.reportId && value.itemId) {
          await this.$store.dispatch(
            'getListForSelect',
            {
              moduleName: this.moduleName,
              payload: { ...this.search },
              stateName: 'details',
              customApiName: 'getDetailsOfIndicatorStatistics'
            }
          )
        }
      }
    }
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        dataSource: this.details.data.countList || [],
        loading: this.details.loading
      }
    }

    return (
      <BNContainer
        modalTitle={this.details.data.fullName || '-'}
        width={'100%'}
        class={'main-container chart-container'}
        contentClass={'chart-content'}
        showBoxShadow={false}
      >
        <div class={'completed-quantity'}>已完成填报数：{this.details.data.count}</div>
        <Table
          ref={`${this.moduleName}Table`}
          {...attributes}
          {...{ scopedSlots: { serialNumber: (text, record, index) => index + 1 + this.serialNumber } }}
        />
        <Chart dataSource={this.details.data} />
      </BNContainer>
    )
  }
}
