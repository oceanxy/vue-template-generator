import '../../assets/styles/index.scss'
import { Table } from 'ant-design-vue'
import { mapGetters } from 'vuex'
import forIndex from '@/mixins/forIndex'

export default {
  inject: ['moduleName', 'submoduleName'],
  mixins: [forIndex],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '企业',
            dataIndex: 'companyName'
          },
          {
            title: '填写结果',
            dataIndex: 'resultContent'
          },
          {
            title: '填写时间',
            width: 180,
            dataIndex: 'createTimeStr'
          }
        ],
        rowKey: 'id',
        tableLayout: 'fixed',
        dataSource: [],
        pagination: false,
        scroll: {},
        size: 'middle'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    loading() {
      return this.getState('loading', this.moduleName, this.submoduleName)
    },
    itemId() {
      return this.getState('itemId', this.moduleName)
    },
    list() {
      return this.getState('list', this.moduleName, this.submoduleName)
    }
  },
  watch: {
    async itemId() {
      await this._dispatch(
        'getList',
        { additionalQueryParameters: { itemId: this.itemId } },
        {
          root: true,
          submoduleName: this.submoduleName
        }
      )
    }
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        dataSource: this.list || [],
        loading: this.loading
      }
    }

    return (
      <Table
        class={'results-table'}
        ref={`${this.moduleName}Table`}
        {...attributes}
        {...{ scopedSlots: { serialNumber: (text, record, index) => index + 1 } }}
      />
    )
  }
}
