import forTable from '@/mixins/forTable'
import { Button, Space, Tag } from 'ant-design-vue'

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
            title: '所属组织',
            width: 120,
            dataIndex: 'parentName'
          },
          {
            title: '名称',
            width: 220,
            dataIndex: 'fullName'
          },
          {
            title: '省份',
            width: 80,
            align: 'center',
            dataIndex: 'provinceName'
          },
          {
            title: '城市',
            width: 80,
            align: 'center',
            dataIndex: 'cityName'
          },
          {
            title: '区',
            width: 80,
            align: 'center',
            dataIndex: 'countyName'
          },
          {
            title: '街道',
            width: 150,
            align: 'center',
            dataIndex: 'streetName'
          },
          {
            title: '描述',
            width: 200,
            dataIndex: 'orgDescribe'
          },
          {
            title: '排序',
            align: 'center',
            width: 80,
            dataIndex: 'sortIndex'
          },
          {
            title: '创建时间',
            align: 'center',
            width: 140,
            dataIndex: 'createTimeStr'
          },
          {
            title: '状态',
            align: 'center',
            width: 80,
            fixed: 'right',
            scopedSlots: { customRender: 'status' }
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
        status: (text, record) => {
          return record.status === 1 ? <Tag color="green">启用</Tag> : <Tag color="red">停用</Tag>
        },
        operation: (text, record) => (
          <Space>
            <Button
              type="link"
              size="small"
              onClick={() => this.onEditClick(record)}
            >
              编辑
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
