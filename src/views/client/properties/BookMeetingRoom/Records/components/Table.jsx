import forTable from '@/mixins/forTable'
import { Button, Modal, Table } from 'ant-design-vue'
import { mapAction, mapState } from '@/utils/store'

export default {
  mixins: [forTable()],
  data: () => ({
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
          scopedSlots: { customRender: 'appointmentDate' }
        },
        {
          title: '会议室',
          dataIndex: 'roomName'
        },
        {
          title: '占用时间',
          dataIndex: 'appointmentDuration',
          scopedSlots: { customRender: 'appointmentDuration' }
        },
        {
          title: '操作',
          width: 100,
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      rowSelection: null
    }
  }),
  computed: { ...mapState(['loading']) },
  methods: {
    async onCancelClick(item) {
      Modal.confirm({
        content: '确定取消预约？',
        onOk: async () => {
          await this.cancelMeetingRoomAppointment({
            id: item.id, moduleName: this.moduleName
          })

          return Promise.resolve()
        },
        onCancel() {
        }
      })
    },
    ...mapAction(['cancelMeetingRoomAppointment'])
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName)
      }
    }

    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...attributes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1 + this.serialNumber,
            appointmentDate: (text, record) => (
              <span>
                {record.appointmentStartTimeStr}~{record.appointmentEndTimeStr}
              </span>
            ),
            appointmentDuration: (text, record) => {
              return <span>{record.appointmentDuration}分钟</span>
            },
            operation: (text, record) => {
              return record.appointmentStatus === 1
                ? <Button type="link" onClick={() => this.onCancelClick(record)}>取消预约</Button>
                : null
            }
          }
        }}
      />
    )
  }
}
