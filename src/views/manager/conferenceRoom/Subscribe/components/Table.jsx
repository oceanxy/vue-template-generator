import '../assets/styles/index.scss'
import { Button, Modal, Space, Table, Tag } from 'ant-design-vue'
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
            fixed: true,
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '预约时间',
            width: 120,
            dataIndex: 'createTimeStr'
          },
          {
            title: '会议室',
            width: 150,
            dataIndex: 'roomName'
          },
          {
            title: '预约企业',
            width: 150,
            dataIndex: 'companyName'
          },
          {
            title: '占用时段',
            width: 120,
            scopedSlots: { customRender: 'timeInterval' }
          },
          {
            title: '预约说明',
            width: 200,
            dataIndex: 'description'
          },
          {
            title: '状态',
            // align: 'center',
            width: 80,
            fixed: 'right',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 180,
            scopedSlots: { customRender: 'operation' }
          }
        ],
        rowSelection: null
      }
    }
  },
  methods: {
    onCancelSubscribe(record) {
      Modal.confirm({
        title: '确认',
        content: '确定要取消吗？',
        okText: '确认',
        cancelText: '取消',
        onOk: async close => {
          const res = await this.cancelMeetingRoomAppointment({ id: record.id })

          if (res.status) {
            this.fetchList()
          }

          close()
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
    const getStatus = record => {
      if (record.appointmentStatus === 1) {
        return <Tag color="orange">预约中</Tag>
      } else if (record.appointmentStatus === 0) {
        return <Tag color="red">已取消</Tag>
      } else if (record.appointmentStatus === 2) {
        return <Tag color="green">已使用</Tag>
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
            timeInterval: (text, record) => {
              return (
                <span>
                  {record.appointmentStartTimeStr}~{record.appointmentEndTimeStr}
                </span>
              )
            },
            status: (text, record) => {
              return getStatus(record)
            },
            operation: (text, record) => (
              <Space>
                {
                  record.appointmentStatus === 1 ? (
                    <Button type="link" size="small" onClick={() => this.onCancelSubscribe(record)}>
                      取消预约
                    </Button>
                  ) : null
                }
                {
                  record.appointmentStatus === 1 ? (
                    <Button type="link" size="small" onClick={() => this.onEditClick(record)}>
                      编辑
                    </Button>
                  ) : null
                }
                <Button type="link" size="small" onClick={() => this.onDeleteClick(record)}>
                  删除
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
