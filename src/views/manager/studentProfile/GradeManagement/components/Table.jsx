import '../assets/styles/index.scss'
import { Table, Switch, Button, Space } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import apis from '@/apis'
import { verificationDialog } from '@/utils/message'

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
            title: '年级名称',
            width: 150,
            fixed: true,
            dataIndex: 'gradeName'
          },
          {
            title: '学校名称',
            // width: 200,
            dataIndex: 'schoolName'
          },
          {
            title: '入学年份',
            dataIndex: 'gradeYear'
          },
          {
            title: '届数',
            dataIndex: 'gradeTh'
          },
          {
            title: '年级类型',
            dataIndex: 'gradeTypeStr'
          },
          {
            title: '班级数量',
            dataIndex: 'classNum'
          },
          {
            title: '年级人数',
            dataIndex: 'studentNum'
          },
          {
            title: '状态',
            align: 'center',
            fixed: 'right',
            width: 100,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            align: 'center',
            fixed: 'right',
            width: 120,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    async onSetGraduation(record) {
      verificationDialog(
        async () => {
          const { status } = await apis.setGraduation({ id: record.id })

          if (status) {
            await this.$store.dispatch('getList', {
              moduleName: this.moduleName,
              customApiName: this.customApiName
            })
          }

          return status
        },
        (
          <div>你确定把<span style={{ color: 'blue' }}>{record.schoolName}</span>设置毕业</div>
        )
      )

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
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onSetGraduation(record)}
                >
                  设置为毕业
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
