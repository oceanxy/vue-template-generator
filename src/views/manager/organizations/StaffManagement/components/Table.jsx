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
            dataIndex: 'orgName'
          },
          {
            title: '姓名',
            width: 100,
            dataIndex: 'fullName'
          },
          {
            title: '角色组',
            width: 220,
            dataIndex: 'roleNames'
          },
          {
            title: '性别',
            width: 80,
            align: 'center',
            dataIndex: 'genderStr'
          },
          {
            title: '登录名',
            width: 80,
            dataIndex: 'loginName'
          },
          {
            title: '电话号码',
            width: 100,
            dataIndex: 'phone'
          },
          {
            title: 'QQ',
            width: 100,
            dataIndex: 'qq'
          },
          {
            title: '邮箱',
            width: 100,
            dataIndex: 'email'
          },
          {
            title: '组织管理',
            align: 'center',
            width: 100,
            dataIndex: 'isOrganLeaderStr'
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
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 160,
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
            <Button
              type="link"
              size="small"
              onClick={() => this.onDeleteClick(record)}
            >
              修改密码
            </Button>
          </Space>
        )
      }
    }
  }
}
