import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data () {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            align: 'center',
            width: 60,
            fixed: true,
            scopedSlots: { customRender: 'index' }
          },
          {
            title: '目标客户',
            fixed: true,
            width: 260,
            dataIndex: 'title'
          },
          {
            title: '来源',
            width: 140,
            dataIndex: 'cluesResource'
          },
          {
            title: '采集人/时间',
            width: 140,
            scopedSlots: { customRender: 'gatherInfo' }
          },
          // {
          //   title: '跟进团队/成员',
          //   width: 120,
          //   dataIndex: 'memberName'
          // },
          {
            title: '最新进展/更新时间',
            width: 140,
            scopedSlots: { customRender: 'newDynamic' }
          },
          {
            title: '状态',
            align: 'center',
            fixed: 'right',
            width: 60,
            scopedSlots: { customRender: 'status' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 260,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  render () {
    const attributes = {
      props: {
        ...this.tableProps,
        loading: this.getLoading(this.moduleName)
      }
    }
    const statusStyle = row => {
      if (row.allotStatus === 1) {
        return <span>待分配</span>
      } else if (row.allotStatus === 5) {
        return <span style={{ color: 'red' }}>已结束</span>
      } else {
        return <span style={{ color: 'green' }}>{row.allotStatusStr}</span>
      }
    }
    const detailButton = record => (
      <Button type="link" size="small" onClick={() => this._setVisibleOfModal(record, 'visibleOfDetails')}>
        查看详情
      </Button>
    )
    const recoveryButton = record => (
      <Button
        type="link"
        size="small"
        onClick={() => this._setVisibleOfModal({ ids: record.id }, 'visibleOfRecoverClues')}
      >
        收回
      </Button>
    )
    const distributionButton = record => (
      <Button
        type="link"
        size="small"
        onClick={() => this._setVisibleOfModal({ ids: record.id }, 'visibleOfAssignLeads')}
      >
        分配
      </Button>
    )
    const restartButton = record => (
      <Button
        type="link"
        size="small"
        onClick={() => this._setVisibleOfModal({ ids: record.id }, 'visibleOfAssignLeads')}
      >
        重新开启
      </Button>
    )
    const delButton = record => (
      <Button type="link" size="small" onClick={() => this.onDeleteClick(record)}>
        删除
      </Button>
    )
    const statusBtn = record => {
      if (record.allotStatus === 1) {
        return [detailButton(record), distributionButton(record), delButton(record)]
      } else if (record.allotStatus === 2) {
        return [detailButton(record), recoveryButton(record), delButton(record)]
      } else if (record.allotStatus === 3) {
        return [detailButton(record)]
      } else if (record.allotStatus === 4) {
        return [detailButton(record)]
      } else if (record.allotStatus === 5) {
        return [detailButton(record), restartButton(record), delButton(record)]
      }
    }

    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...attributes}
        {...{
          scopedSlots: {
            index: (text, record, index) => <span> {index + 1}</span>,
            gatherInfo: text => (
              <div>
                <span>{text.gatherName}</span>
                <br /> <span>{text.gatherTimeStr}</span>
              </div>
            ),
            newDynamic: text => (
              <div>
                <span>{text.processDescription}</span>
                <br />
                <span>{text.processDate}</span>
              </div>
            ),
            status: (text, record) => <div>{statusStyle(text)}</div>,
            operation: (text, record) => <Space>{...statusBtn(record)}</Space>
          }
        }}
      />
    )
  }
}
