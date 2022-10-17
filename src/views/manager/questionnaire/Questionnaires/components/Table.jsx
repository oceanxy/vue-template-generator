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
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '问卷标题',
            width: 160,
            dataIndex: 'fullName'
          },
          {
            title: '有效期',
            width: 260,
            scopedSlots: { customRender: 'validityPeriod' }
          },
          {
            title: '完成数',
            width: 80,
            align: 'center',
            dataIndex: 'finishNum'
          },
          {
            title: '未完成数',
            width: 80,
            align: 'center',
            dataIndex: 'unFinishNum'
          },
          {
            title: '创建人',
            width: 70,
            align: 'center',
            dataIndex: 'creatorName'
          },
          {
            title: '创建时间',
            width: 140,
            dataIndex: 'createTimeStr'
          },
          {
            title: '状态',
            align: 'center',
            fixed: 'right',
            width: 60,
            dataIndex: 'reportStatusStr'
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
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
            validityPeriod: (text, record) => `${record.startTimeStr} ~ ${record.endTimeStr}`,
            status: (text, record) => (
              record.status
            ),
            operation: (text, record) => (
              <Space>
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
                        {
                          ids: record.id,
                          reportStatus: record.reportStatus
                        },
                        'visibleOfQuestionnaireSwitch'
                      )}
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
                        'visibleOfQuestionnaireSwitch'
                      )
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
                {
                  record.reportStatus !== 2 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this.$router.push({
                        name: 'questionnaireRecords',
                        query: { reportId: record.id }
                      })}
                    >
                      问卷记录
                    </Button>
                  ) : null
                }
                {
                  record.reportStatus !== 2 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this.$router.push({ name: 'questionnaireStatistics', query: { id: record.id } })}
                    >
                      问卷统计
                    </Button>
                  ) : null
                }
                {
                  record.reportStatus !== 2 ? (
                    <Button
                      type="link"
                      size="small"
                      disabled={this.exportButtonDisabled}
                      onClick={() => this.onExport({ reportId: record.id }, '问卷调查')}
                    >
                      导出结果
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
