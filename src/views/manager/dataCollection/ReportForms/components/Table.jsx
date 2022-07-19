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
            title: '名称',
            dataIndex: 'fullName'
          },
          {
            title: '类型',
            dataIndex: 'reportTypeStr'
          },
          {
            title: '填报对象',
            dataIndex: 'fillObjStr'
          },
          {
            title: '填报周期',
            dataIndex: 'fillPeriodStr'
          },
          {
            title: '开始时间',
            align: 'center',
            dataIndex: 'startTimeStr'
          },
          {
            title: '结束时间',
            align: 'center',
            dataIndex: 'endTimeStr'
          },
          {
            title: '填报内容',
            align: 'center',
            scopedSlots: { customRender: 'itemNum' }
          },
          {
            title: '已填报',
            align: 'center',
            dataIndex: 'finishNum'
          },
          {
            title: '未填报',
            align: 'center',
            dataIndex: 'unFinishNum'
          },
          // {
          //   title: '填报率',
          //   dataIndex: ''
          // },
          {
            title: '状态',
            align: 'center',
            width: 60,
            dataIndex: 'statusStr'
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
            itemNum: (text, record) => (
              <Button
                type="link"
                onClick={() => this._setVisibleOfModal(record, 'visibleOfReportItems')}
              >
                {record.itemNum}
              </Button>
            ),
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
                {
                  record.reportStatus === 2 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this._setVisibleOfModal(
                        { ids: record.id, reportStatus: record.reportStatus },
                        'visibleOfReportSwitch')
                      }
                    >
                      发布
                    </Button>
                  ) : null
                }
                {
                  record.reportStatus === 1 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this._setVisibleOfModal(
                        { ids: record.id, reportStatus: record.reportStatus },
                        'visibleOfReportSwitch')
                      }
                    >
                      结束
                    </Button>
                  ) : null
                }
                {
                  record.reportStatus === 2 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this.onEditClick(record)}
                    >
                      编辑
                    </Button>
                  ) : null
                }
                {
                  record.reportStatus !== 1 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this.onDeleteClick(record)}
                    >
                      删除
                    </Button>
                  ) : null
                }
              </Space>
            )
          }
        }}
      />
    )
  }
}
