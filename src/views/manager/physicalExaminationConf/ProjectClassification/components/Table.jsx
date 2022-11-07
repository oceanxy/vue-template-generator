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
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '分类名称',
            dataIndex: 'catalogName'
          },
          {
            title: '备注',
            dataIndex: 'remark'
          },
          {
            title: '排序',
            dataIndex: 'sortIndex'
          },
          {
            title: '创建时间',
            dataIndex: 'createTimeStr'
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
            }
          }
        }}
      />
    )
  }
}
