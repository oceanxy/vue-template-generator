import '../assets/styles/index.scss'
import { Table, Tag, Switch } from 'ant-design-vue'
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
            title: '名称',
            dataIndex: 'monitorName'
          },
          {
            title: '监测体检指标名称',
            dataIndex: 'monitorItemKpiName'
          },
          {
            title: '检测参数名称',
            dataIndex: 'monitorParamName'
          },
          {
            title: '是否历史数据差异',
            align: 'center',
            width: 80,
            dataIndex: 'isHistoryDifferenceStr'
          },
          {
            title: '历史数据差异类型',
            align: 'center',
            width: 130,
            scopedSlots: { customRender: 'historyDifferenceType' }
          },
          {
            title: '是否绝对值比较',
            dataIndex: 'isAbsoluteDifferenceStr'
          },
          {
            title: '绝对值比较类型',
            align: 'center',
            width: 130,
            scopedSlots: { customRender: 'absoluteDifferenceType' }
          },
          {
            title: '绝对值比较值',
            dataIndex: 'absoluteDifferenceValue'
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
            historyDifferenceType: (text, record) => {
              return record.historyDifferenceType === 1 ? <Tag color="green">高于</Tag> : <Tag color="red">低于</Tag>
            },
            absoluteDifferenceType: (text, record) => {
              return record.absoluteDifferenceType === 1 ? <Tag color="green">高于</Tag> : <Tag color="red">低于</Tag>
            }

          }
        }}
      />
    )
  }
}
