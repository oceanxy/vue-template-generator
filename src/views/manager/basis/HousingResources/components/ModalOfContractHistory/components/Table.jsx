import { Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import { mapGetters } from 'vuex'

export default {
  inject: ['submoduleName', 'visibleField'],
  mixins: [forTable()],
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
            title: '签约企业',
            dataIndex: 'companyName'
          },
          {
            title: '签约日期',
            dataIndex: 'signingTimeStr'
          },
          {
            title: '解约日期',
            dataIndex: 'removeTimeStr'
          },
          {
            title: '周期（月）',
            align: 'center',
            dataIndex: 'durationMonth'
          },
          {
            title: '状态',
            align: 'center',
            width: 80,
            scopedSlots: { customRender: 'signingStatus' }
          }
        ],
        rowSelection: null,
        tableLayout: 'fixed',
        size: 'middle'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    additionalQueryParameters() {
      return { roomId: this.getState('currentItem', this.moduleName).id }
    }
  },
  render() {
    const attruibutes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName, this.submoduleName)
      },
      attrs: { class: 'tg-table-in-modal' }
    }

    return (
      <Table
        {...attruibutes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1 + this.serialNumber,
            signingStatus: (text, record) => (
              <span style={{ color: ['#52c41a', '#faad14'][record.signingStatus - 1] }}>
                {['签约中', '已解约'][record.signingStatus - 1]}
              </span>
            )
          }
        }}
      />
    )
  }
}
