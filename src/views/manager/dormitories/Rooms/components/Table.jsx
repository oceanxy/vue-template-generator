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
            title: '学校',
            width: 200,
            dataIndex: 'schoolName'
          },
          {
            title: '房号',
            width: 170,
            dataIndex: 'roomNo'
          },
          {
            title: '位置',
            dataIndex: 'buildName'
          },
          {
            title: '面积（㎡）',
            width: 100,
            align: 'center',
            dataIndex: 'roomArea'
          },
          {
            title: '床位数',
            width: 100,
            align: 'center',
            dataIndex: 'bedNum'
          },
          {
            title: '入住人数',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'checkInNum' }
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
        status: (text, record) => (
          <Switch
            disabled={!!record.checkInNum}
            checked={record.status === 1}
            onChange={checked => this.onStatusChange({ checked, record })}
          />
        ),
        checkInNum: (text, record) => (
          <Button
            type="link"
            onClick={() => this._setVisibilityOfModal(record, 'visibilityOfStudentInfo')}
          >
            {record.checkInNum}
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
            {
              !record.checkInNum
                ? (
                  <Button
                    type="link"
                    size="small"
                    onClick={() => this.onDeleteClick(record)}
                  >
                    删除
                  </Button>
                )
                : null
            }
          </Space>
        )
      }
    }
  }
}
