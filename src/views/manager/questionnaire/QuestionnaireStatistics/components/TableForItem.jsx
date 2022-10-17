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
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '标题',
            width: 100,
            dataIndex: 'fullName'
          },
          {
            title: '数量',
            width: 80,
            align: 'center',
            dataIndex: 'count'
          },
          {
            title: '占比',
            align: 'center',
            width: 80,
            dataIndex: 'percent'
          }
        ]
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    loading() {
      return this.getState('loading', this.moduleName)
    },
    itemId() {
      return this.getState('itemId', this.moduleName)
    },
    details() {
      return this.getState('details', this.moduleName)
    }
  },
  watch: {
    async itemId() {
      await this._dispatch(
        'getList',
        {
          additionalQueryParameters: { itemId: this.itemId },
          stateName: 'details'
        },
        { root: true }
      )
    }
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        dataSource: this.details.countList || [],
        loading: this.loading
      }
    }

    return (
      <BNContainer
        modalTitle={this.details.fullName || '-'}
        width={'100%'}
        class={'main-container chart-container'}
        contentClass={'chart-content'}
        showBoxShadow={false}
      >
        <div class={'completed-quantity'}>已完成问卷数：{this.details.count}</div>
        <Table
          class={'statistics-table'}
          ref={`${this.moduleName}Table`}
          {...attributes}
          {...{ scopedSlots: { serialNumber: (text, record, index) => index + 1 } }}
        />
        <Chart dataSource={this.details} />
      </BNContainer>
    )
  }
}
