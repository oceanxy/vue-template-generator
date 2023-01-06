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
            title: '学生',
            width: 120,
            dataIndex: 'parentName'
          },
          {
            title: '健康码',
            width: 220,
            dataIndex: 'fullName'
          },
          {
            title: '行程卡',
            width: 80,
            align: 'center',
            dataIndex: 'provinceName'
          },
          {
            title: '核酸报告',
            width: 80,
            align: 'center',
            dataIndex: 'cityName'
          },
          {
            title: '提交时间',
            width: 80,
            align: 'center',
            dataIndex: 'countyName'
          }
        ]
      },
      scopedSlots: {
        operation: (text, record) => (
          <Space>
            <Button
              type="link"
              size="small"
              disabled={this.isFeatureDisabled}
              onClick={() => this.onEditClick(record)}
            >
              查看
            </Button>
            <Button
              type="link"
              size="small"
              disabled={this.isFeatureDisabled}
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
