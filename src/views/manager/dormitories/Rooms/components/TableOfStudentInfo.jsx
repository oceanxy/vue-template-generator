import forTable from '@/mixins/forTable'
import { Button } from 'ant-design-vue'

export default {
  mixins: [forTable()],
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
            title: '年级',
            align: 'center',
            dataIndex: 'gradeName'
          },
          {
            title: '班级',
            align: 'center',
            dataIndex: 'classNumber'
          },
          {
            title: '姓名',
            align: 'center',
            dataIndex: 'fullName'
          },
          {
            title: '性别',
            align: 'center',
            scopedSlots: { customRender: 'gender' }
          },
          {
            title: '年龄',
            align: 'center',
            dataIndex: 'age'
          },
          {
            title: '操作',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'operation' }
          }
        ],
        rowSelection: null
      },
      scopedSlots: {
        gender: (text, record) => {
          return (
            <div>{['男', '女', '未知'][+record.gender - 1]}</div>
          )
        },
        operation: (text, record) => (
          <Button
            type="link"
            size="small"
            onClick={() => this.onDeleteClick(record, {
              roomId: this.additionalQueryParameters.roomId,
              studentIds: [record.id]
            })}
          >
            删除
          </Button>
        )
      }
    }
  },
  computed: {
    additionalQueryParameters() {
      return { roomId: this.$store.state[this.moduleName].currentItem.id }
    }
  }
}
