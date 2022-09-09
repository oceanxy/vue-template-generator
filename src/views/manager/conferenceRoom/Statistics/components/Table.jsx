import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import { mapAction } from '@/utils/store'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '月份',
            width: 100,
            dataIndex: 'appointmentDateMonth'
          },
          {
            title: '会议室',
            width: 100,
            dataIndex: 'roomName'
          },
          // {
          //   title: '企业',
          //   dataIndex: 'companyName'
          // },
          {
            title: '预约时长',
            width: 100,
            scopedSlots: { customRender: 'appointmentDuration' }
          },
          {
            title: '预约详情',
            width: 80,
            scopedSlots: { customRender: 'detail' }
          },
          {
            title: '操作',
            key: 'operation',
            width: 150,
            fixed: 'right',
            align: 'center',
            scopedSlots: { customRender: 'operation' }
          }
        ],
        rowSelection: null
      }
    }
  },
  methods: {...mapAction(['cancelMeetingRoomAppointment'])},
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
            serialNumber: (text, record, index) => {
              return <span>{index + 1}</span>
            },
            appointmentDuration: (text, record) => {
              return <span>{record.appointmentDuration}分钟</span>
            },
            detail: (text, record) => {
              return <a onClick={() => this._setVisibleOfModal(record, 'visibleOfDetail')}>查看</a>
            },
            operation: (text, record) => (
              <Space>
                {/*<Button type="link" size="small">*/}
                {/*  导出预约明细*/}
                {/*</Button>*/}
              </Space>
            )
          }
        }}
      />
    )
  }
}
