import '../assets/styles/index.scss'
import { Pagination, Table } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import { mapAction, mapMutation, mapState } from '@/utils/store'
import { omit } from 'lodash'

export default {
  mixins: [forModal()],
  data() {
    return {
      visibleField: 'visibleOfDetail',
      modalProps: {
        width: 800,
        wrapClassName: 'bnm-modal-conferenceroom-statistics-detail',
        footer: null
      },
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '预约时间',
            width: 100,
            dataIndex: 'appointmentDateDay'
          },
          {
            title: '预约企业',
            dataIndex: 'companyName'
          },
          {
            title: '预约时长(分钟)',
            dataIndex: 'appointmentDuration',
            width: 150
          }
        ],
        rowSelection: null,
        pagination: false
      },
      paginationProps: {
        currentPage: 1,
        total: 0,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: total => `共 ${total} 条`
      },
      paginationOn: {
        change: this.onPaginationChange,
        showSizeChange: this.onSizeChange
      }
    }
  },
  computed: { ...mapState(['detailLoading', 'detailList']) },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          this.getList()
        } else {
          this.paginationProps.currentPage = 1
          this.set_detailList([])
        }
      }
    }
  },
  methods: {
    ...mapAction(['getMeetingRoomAppointmentDetailList']),
    ...mapMutation(['set_detailList']),
    onPaginationChange(value) {
      this.paginationProps.currentPage = value
      this.getList()
    },
    onSizeChange(current, size) {
      this.paginationProps.currentPage = 1
      this.paginationProps.pageSize = size

      this.getList()
    },
    async getList() {
      const query = {
        pageIndex: this.paginationProps.currentPage - 1,
        pageSize: this.paginationProps.pageSize,
        appointmentDateMonth: this.currentItem.appointmentDateMonth,
        roomId: this.currentItem.roomId
      }
      const res = await this.getMeetingRoomAppointmentDetailList({ payload: query })

      if (res.status) {
        this.paginationProps.total = res.data.totalNum
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: { cancel: () => this.onCancel(this.visibleField) }
    }
    const tableAttributes = {
      props: {
        ...this.tableProps,
        dataSource: this.detailList,
        loading: this.detailLoading
      }
    }

    return (
      <DragModal {...attributes}>
        <Table
          {...tableAttributes}
          scopedSlots={{
            serialNumber: (text, record, index) => {
              return <span>{index + 1}</span>
            }
          }}
        ></Table>
        <br />
        <Pagination
          {...{
            props: omit(this.paginationProps, 'on'),
            on: this.paginationOn
          }}></Pagination>
      </DragModal>
    )
  }
}
