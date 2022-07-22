import '../assets/styles/index.scss'
import { Button, Space, Switch, Table } from 'ant-design-vue'
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
            dataIndex: 'targetTypeStr'
          },
          {
            title: '指标解释',
            dataIndex: 'description'
          },
          {
            title: '评分标准',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'grading' }
          },
          {
            title: '最高分',
            width: 100,
            align: 'center',
            dataIndex: 'highestScore'
          },
          {
            title: '佐证材料',
            scopedSlots: { customRender: 'targetProveList' }
          },
          {
            title: '排序',
            width: 60,
            align: 'center',
            dataIndex: 'sortIndex'
          },
          {
            title: '状态',
            align: 'center',
            width: 80,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 100,
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
            grading: (text, record) => (
              <Button
                size={'small'}
                type="link"
                onClick={() => this._setVisibleOfModal(record, 'visibleOfGrading')}
              >
                查看详情
              </Button>
            ),
            targetProveList: (text, record) => (
              <ol style={{ paddingLeft: '20px', marginBottom: 0 }}>
                {
                  record.targetProveList?.map(item => (
                    <li>{item.fullName}</li>
                  ))
                }
              </ol>
            ),
            status: (text, record) => (
              <Switch
                checked={+record.status === 1}
                onChange={checked => this.onStatusChange(checked, record)}
              />
            ),
            operation: (text, record) => (
              <Space class="operation-space">
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onEditClick(record)}
                >
                  编辑
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
