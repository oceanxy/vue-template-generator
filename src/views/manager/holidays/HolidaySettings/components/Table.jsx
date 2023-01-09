import forTable from '@/mixins/forTable'
import { Button, Space } from 'ant-design-vue'

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
            title: '节假日名称',
            dataIndex: 'parentName'
          },
          {
            title: '日期',
            dataIndex: 'fullName'
          },
          {
            title: '休假天数',
            align: 'center',
            dataIndex: 'provinceName'
          },
          {
            title: '调休详情',
            align: 'center',
            dataIndex: 'provinceName2'
          },
          {
            title: '操作',
            fixed: 'right',
            align: 'center',
            width: 150,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      },
      scopedSlots: {
        operation: (text, record) => (
          <Space>
            <Button
              type="link"
              size="small"
            >
              编辑
            </Button>
            <Button
              type="link"
              size="small"
            >
              删除
            </Button>
            <Button
              type="link"
              size="small"
            >
              调休设置
            </Button>
          </Space>
        )
      }
    }
  }
}
