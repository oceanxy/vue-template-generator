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
            title: '项目名称',
            dataIndex: 'itemName'
          },
          {
            title: '指标名称',
            dataIndex: 'itemKpiName'
          },
          {
            title: '结论等级名称',
            dataIndex: 'conclusionLevelName'
          },
          {
            title: '等级',
            align: 'center',
            dataIndex: 'level'
          },
          {
            title: '防治建议',
            dataIndex: 'proposal'
          },
          {
            title: '备注',
            dataIndex: 'remark'
          },
          {
            title: '排序',
            align: 'center',
            width: 80,
            dataIndex: 'sortIndex'
          },
          {
            title: '状态',
            align: 'center',
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '判断条件',
            align: 'center',
            scopedSlots: { customRender: 'JudgmentConditions' }
          },
          {
            title: '操作',
            align: 'center',
            width: 80,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
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
            JudgmentConditions: (text, record) => (
              <Button
                type="link"
                size="small"
              // onClick={() => this.onEditClick(record)}
              >
                点击查看
              </Button>
            ),
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onEditClick(record)}
                >
                  修改
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
