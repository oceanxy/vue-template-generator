import '../assets/styles/index.scss'
import { Table, Space, Button } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import { verificationDialog } from '@/utils/message'

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
            align: 'center',
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
          const status = await this.$store.dispatch('getListWithLoadingStatus', {
            moduleName: this.moduleName,
            customApiName: 'createReport',
            payload: {
              id: record.id
            }
          })

          console.log(status)

          return status
        }, '已有报告，如再生成报告，则会覆盖，确认吗?')
      } else {
        this.createReport(record)
      }
    },
    async createReport(record) {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        customApiName: 'createReport',
        payload: {
          id: record.id
        }
      })
    },
    // 下载报告
    onDownloadEeport(record) {
      // let url = record.savaDataUrl
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
                <div>
                  <a
                    href={record.savaDataUrl}
                  >
                    下载报告
                  </a>
                </div>
              </Space>
            )
          }
        }}
      />
    )
  }
}
