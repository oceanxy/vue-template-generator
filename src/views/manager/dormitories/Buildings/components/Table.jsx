import forTable from '@/mixins/forTable'
import { Button, Space, Switch } from 'ant-design-vue'

export default {
  mixins: [forTable({ isFetchList: false })],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 70,
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '编号',
            width: 170,
            fixed: true,
            dataIndex: 'buildNo'
          },
          {
            title: '学校',
            width: 200,
            dataIndex: 'schoolName'
          },
          {
            title: '楼栋名称',
            dataIndex: 'fullName'
          },
          {
            title: '位置',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'pos' }
          },
          {
            title: '楼层数',
            width: 100,
            align: 'center',
            dataIndex: 'floorNum'
          },
          {
            title: '地下楼层数',
            width: 100,
            align: 'center',
            dataIndex: 'undergroundNum'
          },
          {
            title: '状态',
            align: 'center',
            width: 70,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'operation' }
          }
        ]
      },
      scopedSlots: {
        pos: (text, record) => `${record.latitude ?? '-'}, ${record.longitude ?? '-'}`,
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
    }
  }
}
