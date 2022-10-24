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
            title: '名称',
            width: 200,
            dataIndex: 'fullName'
          },
          {
            title: '类型',
            width: 80,
            dataIndex: 'reportTypeStr'
          },
          {
            title: '填报对象',
            width: 180,
            scopedSlots: { customRender: 'fillObj' }
          },
          {
            title: '填报周期',
            width: 100,
            dataIndex: 'fillPeriodStr'
          },
          {
            title: '开始时间',
            align: 'center',
            width: 120,
            dataIndex: 'startTimeStr'
          },
          {
            title: '结束时间',
            align: 'center',
            width: 120,
            dataIndex: 'endTimeStr'
          },
          {
            title: '填报内容',
            align: 'center',
            width: 80,
            scopedSlots: { customRender: 'itemNum' }
          },
          {
            title: '已填报',
            align: 'center',
            width: 80,
            dataIndex: 'finishNum'
          },
          {
            title: '未填报',
            align: 'center',
            width: 80,
            dataIndex: 'unFinishNum'
          },
          // {
          //   title: '填报率',
          //   dataIndex: ''
          // },
          {
            title: '发布状态',
            align: 'center',
            width: 100,
            fixed: 'right',
            dataIndex: 'reportStatusStr'
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 200,
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
            serialNumber: (text, record, index) => index + 1 + this.serialNumber,
            itemNum: (text, record) => (
              <Button
                type="link"
                onClick={() => this._setVisibleOfModal(record, 'visibleOfReportItems')}
              >
                {record.itemNum}
              </Button>
            ),
            fillObj: (text, record) => (
              <ul
                style={{
                  paddingLeft: '20px',
                  marginBottom: 0
                }}
              >
                {record.fillObjStr?.split(',').map(item => <li>{item}</li>)}
              </ul>
            ),
            status: (text, record) => (
              record.status
            ),
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this._setVisibleOfModal(record, 'visibleOfPreview')}
                >
                  预览
                </Button>
                {
                  record.reportStatus === 2 ? (
                    <Button
                      type="link"
                      size="small"
                      onClick={() => this._setVisibleOfModal(
                        { ids: record.id, reportStatus: record.reportStatus },
                        'visibleOfReportSwitch'
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
                        'visibleOfReportSwitch'
                      )}
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
