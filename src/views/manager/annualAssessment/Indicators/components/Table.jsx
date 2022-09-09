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
            fixed: true,
            key: 'serialNumber',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '名称',
            width: 120,
            fixed: true,
            dataIndex: 'fullName',
            key: 'fullName'
          },
          {
            title: '类型',
            width: 120,
            dataIndex: 'targetTypeStr',
            key: 'targetTypeStr'
          },
          {
            title: '指标解释',
            width: 300,
            dataIndex: 'description',
            key: 'description'
          },
          {
            title: '评分标准',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'grading' },
            key: 'grading'
          },
          {
            title: '组件类型/最高分',
            width: 150,
            align: 'center',
            scopedSlots: { customRender: 'highestScore' },
            key: 'highestScore'
          },
          {
            title: '佐证材料',
            width: 400,
            scopedSlots: { customRender: 'targetProveList' },
            key: 'targetProveList'
          },
          {
            title: '排序',
            width: 60,
            align: 'center',
            dataIndex: 'sortIndex',
            key: 'sortIndex'
          },
          {
            title: '状态',
            align: 'center',
            width: 80,
            fixed: 'right',
            scopedSlots: { customRender: 'status' },
            key: 'status'
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 140,
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
              <ol
                style={{
                  paddingLeft: '20px', marginBottom: 0
                }}
              >
                {
                  record.targetProveList?.map(item => (
                    <li>{item.fullName}</li>
                  ))
                }
              </ol>
            ),
            highestScore: (text, record) => (
              <span>
                {record.modTypeStr}
                {
                  +record.modType === 1 || +record.modType === 2
                    ? ` / ${record.highestScore}`
                    : null
                }
              </span>
            ),
            status: (text, record) => (
              <Switch
                checked={+record.status === 1}
                onChange={checked => this.onStatusChange({ checked, record })}
              />
            ),
            operation: (text, record) => (
              <Space>
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
