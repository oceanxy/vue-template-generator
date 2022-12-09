import '../assets/styles/index.scss'
import { Table, Space, Button, Switch } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            align: 'center',
            width: 80,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '活动名称',
            dataIndex: 'activityName'
          },
          {
            title: '开始时间',
            dataIndex: 'startTimeStr'
          },
          {
            title: '结束时间',
            dataIndex: 'endTimeStr'
          },
          {
            title: '体检项',
            dataIndex: 'peItems'
          },
          {
            title: '体检单位数量',
            align: 'center',
            dataIndex: 'unitNum'
          },
          {
            title: '排序',
            align: 'center',
            dataIndex: 'sortIndex'
          },
          {
            title: '状态',
            align: 'center',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            align: 'center',
            width: 160,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    toPeProgress(record) {
      this.$router.push({ name: 'PEProgress', query: { activityId: record.id } })
    }
  },
  render() {
    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...this.attributes}
        {...{
          scopedSlots: {
            serialNumber: this.getConsecutiveSerialNumber,
            status: (text, record) => {
              return (
                <Switch
                  checked={record.status === 1}
                  onChange={checked => this.onStatusChange({ checked, record })}
                />
              )
            },
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.toPeProgress(record)}
                >
                  查看进度
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onEditClick(record)}
                >
                  修改
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onDeleteClick(record)}
                >
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
