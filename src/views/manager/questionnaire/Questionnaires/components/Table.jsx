import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

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
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '问卷标题',
            dataIndex: 'fullName'
          },
          {
            title: '有效期',
            scopedSlots: { customRender: 'validityPeriod' }
          },
          {
            title: '完成数',
            align: 'center',
            dataIndex: 'finishNum'
          },
          {
            title: '未完成数',
            align: 'center',
            dataIndex: 'unFinishNum'
          },
          {
            title: '创建人',
            align: 'center',
            dataIndex: 'creatorName'
          },
          {
            title: '创建时间',
            dataIndex: 'createTimeStr'
          },
          {
            title: '状态',
            align: 'center',
            width: 60,
            dataIndex: 'reportStatusStr'
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 300,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {},
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName)
      }
    }

    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...attributes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1,
            validityPeriod: (text, record) => `${record.startTimeStr} ~ ${record.endTimeStr}`,
            status: (text, record) => (
              record.status
            ),
            operation: (text, record) => (
              <Space class="operation-space">
                {/*<Button*/}
                {/*  type="link"*/}
                {/*  size="small"*/}
                {/*  // onClick={() => this.onEditClick(record)}*/}
                {/*>*/}
                {/*  预览*/}
                {/*</Button>*/}
                <Button
                  type="link"
                  size="small"
                  style={record.reportStatus !== 2 ? { display: 'none' } : {}}
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfQuestionnaireSwitch')}
                >
                  发布
                </Button>
                <Button
                  type="link"
                  size="small"
                  style={record.reportStatus !== 1 ? { display: 'none' } : {}}
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfQuestionnaireSwitch')}
                >
                  结束
                </Button>
                <Button
                  type="link"
                  size="small"
                  style={record.reportStatus !== 2 ? { display: 'none' } : {}}
                  onClick={() => this.onEditClick(record)}
                >
                  编辑
                </Button>
                <Button
                  type="link"
                  size="small"
                  style={record.reportStatus === 1 ? { display: 'none' } : {}}
                  onClick={() => this.onDeleteClick(record)}
                >
                  删除
                </Button>
                <Button
                  type="link"
                  size="small"
                  style={record.reportStatus === 2 ? { display: 'none' } : {}}
                  // onClick={() => this.onDeleteClick(record)}
                >
                  问卷记录
                </Button>
                <Button
                  type="link"
                  size="small"
                  style={record.reportStatus === 2 ? { display: 'none' } : {}}
                  // onClick={() => this.onDeleteClick(record)}
                >
                  问卷统计
                </Button>
                <Button
                  type="link"
                  size="small"
                  style={record.reportStatus === 2 ? { display: 'none' } : {}}
                  // onClick={() => this.onDeleteClick(record)}
                >
                  导出结果
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
