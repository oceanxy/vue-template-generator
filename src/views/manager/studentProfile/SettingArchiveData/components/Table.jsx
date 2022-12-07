import '../assets/styles/index.scss'
import { Table, Space, Button, Message } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import { verificationDialog } from '@/utils/message'
import apis from '@/apis'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            align: 'center',
            // fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '存档时间',
            // fixed: true,
            dataIndex: 'saveTimeStr'
          },
          {
            title: '数据来源活动',
            dataIndex: 'objFromName'
          },
          {
            title: '备注',
            dataIndex: 'remark'
          },
          {
            title: '创建时间',
            dataIndex: 'createTimeStr'
          },
          {
            title: '创建人姓名',
            dataIndex: 'creatorName'
          },
          {
            title: '最后修改时间',
            dataIndex: 'lastUpdateTimeStr'
          },
          {
            title: '操作',
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    // 生成报告
    onGenerateReport(record) {
      if (record.savaDataUrl) {
        verificationDialog(async () => {
          const { status } = await apis.createReport({ id: record.id })

          return status
        }, '已有报告，如再生成报告，则会覆盖，确认吗?')
      } else {
        this.createReport(record)
      }
    },
    async createReport(record) {
      console.log(record)
      const res = await apis.createReport({ id: record.id })

      if (res.status) {
        Message.warning(res.message)
      } else {
        Message.error(res.message)
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
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onGenerateReport(record)}
                >
                  生成报告
                </Button>
                <a
                  href={record.urlStr}
                  style={{ display: `${record.urlStr ? 'block' : 'none'}` }}
                >
                  下载报告
                </a>
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
        }}
      />
    )
  }
}
