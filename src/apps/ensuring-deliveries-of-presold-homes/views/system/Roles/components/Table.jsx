import forTable from '@/mixins/forTable'
import { Button, Space, Switch } from 'ant-design-vue'

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
            title: '角色名',
            width: 160,
            dataIndex: 'fullName'
          },
          {
            title: '描述',
            dataIndex: 'description'
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
            width: 80,
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
              disabled={this.isFeatureDisabled}
              onClick={() => this.onEditClick(record)}
            >
              编辑
            </Button>
            <Button
              type="link"
              size="small"
              disabled={this.isFeatureDisabled}
              onClick={() => this.onDeleteClick(record)}
            >
              删除
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => this._setVisibilityOfModal(record, 'visibilityOfMenu')}
            >
              配置权限
            </Button>

          </Space>
        )
      }
    }
  },
  computed: {
    // 学校及学校下级禁用新增、修改或删除等一切操作
    isFeatureDisabled() {
      const { type } = this.$store.state[this.moduleName].search

      // 类型（1.区 2.职能部门 3.街道 4.学校顶级 5.学校 6.年级 7.班级）
      return [4, 5, 6, 7].includes(type)
    },
    tableSelectedRowKeys() {
      if (this.getState('selectedRowKeys', this.moduleName).length > 0) {
        return false
      } else {
        return true
      }
    }
  }
}