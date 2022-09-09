import '../assets/styles/index.scss'
import { Button, Space, Switch, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import ImagePreview from '@/components/ImagePreview'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        rowKey: 'activityId',
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '封面图',
            width: 100,
            fixed: true,
            align: 'center',
            scopedSlots: { customRender: 'coverImg' }
          },
          {
            title: '活动',
            width: 160,
            fixed: true,
            scopedSlots: { customRender: 'activityName' }
          },
          {
            title: '开始时间',
            width: 120,
            dataIndex: 'startTimeStr'
          },
          {
            title: '结束时间',
            width: 120,
            dataIndex: 'entTimeStr'
          },
          {
            title: '举办单位/场地',
            width: 150,
            scopedSlots: { customRender: 'organizer' }
          },
          {
            title: '参与人',
            width: 100,
            dataIndex: 'participationObj'
          },
          {
            title: '创建人/创建时间',
            width: 140,
            scopedSlots: { customRender: 'creator' }
          },
          {
            title: '状态',
            align: 'center',
            fixed: 'right',
            width: 80,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 120,
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
            coverImg: (text, record) => {
              return (
                <ImagePreview
                  imageUrls={record.coverImgStr ? [record.coverImgStr] : []}
                  width={32}
                  height={32}
                />
              )
            },
            activityName: (text, record) => (
              <span class={'bnm-table-field-highlight'}>{record.activityName}</span>
            ),
            organizer: (text, record) => (
              <div class={'bnm-table-multiple-field'}>
                <p class={'highlight'}>{record.organizer}</p>
                <p>{record.activityPlace}</p>
              </div>
            ),
            creator: (text, record) => (
              <div class={'bnm-table-multiple-field'}>
                <p>{record.creator || '-'}</p>
                <p>{record.createTimeStr}</p>
              </div>
            ),
            status: (text, record) => (
              <Switch
                checked={+record.status === 1}
                onChange={checked => this.onStatusChange({
                  checked,
                  record,
                  idKey: this.tableProps.rowKey,
                  nameKey: 'activityName'
                })}
              />
            ),
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onEditClick({
                    ...record,
                    id: record.activityId
                  })}
                >
                  编辑
                </Button>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onDeleteClick({
                    ...record,
                    id: record.activityId,
                    fullName: record.activityName
                  })}
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
