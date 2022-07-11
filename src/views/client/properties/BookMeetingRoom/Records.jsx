import './assets/styles/records.scss'
import { Button, Table, Modal } from 'ant-design-vue'
import BNContainer from '@/components/BNContainer'
import dynamicState from '@/mixins/dynamicState'
import store, { dynamicModules } from '@/store/client'
import { mapState, mapAction } from '@/utils/store'
import Pagination from './components/Pagination'
import apis from '@/apis'
export default {
  name: 'BookMeetingRoomRecords',
  mixins: [dynamicState(store, dynamicModules)],
  data: () => ({
    columns: [
      {
        title: '序号',
        scopedSlots: { customRender: 'sortIndex' }
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
    ]
  }),
  computed: {
    ...mapState(['loading', 'list'])
  },
  mounted() {
    this.getList({ moduleName: this.moduleName })
  },
  methods: {
    async onCancelClick(item) {
      Modal.confirm({
        content: '确定取消预约？',
        onOk: async () => {
          await this.cancelMeetingRoomAppointment({ id: item.id, moduleName: this.moduleName })
          return Promise.resolve()
        },
        onCancel() {}
      })
    },
    ...mapAction(['getList', 'cancelMeetingRoomAppointment'])
  },
  render() {
    return (
      <BNContainer class="bn-bookmeeting-roomrecords" modalTitle="会议室预约 > 我的预约记录">
        <Table
          ref={`${this.moduleName}Table`}
          columns={this.columns}
          dataSource={this.list}
          loading={this.loading}
          rowKey="id"
          {...{
            scopedSlots: {
              sortIndex: (text, record, index) => {
                return <span>{index + 1}</span>
              },
              appointmentDate: (text, record) => {
                return (
                  <span>
                    {record.appointmentStartTimeStr}~{record.appointmentEndTimeStr}
                  </span>
                )
              },
              appointmentDuration: (text, record) => {
                return <span>{record.appointmentDuration}分钟</span>
              },
              operation: (text, record) => {
                return record.appointmentStatus === 1 ? (
                  <Button type="link" onClick={() => this.onCancelClick(record)}>
                    取消预约
                  </Button>
                ) : null
              }
            }
          }}
        />
        <br />
        <Pagination></Pagination>
      </BNContainer>
    )
  }
}
