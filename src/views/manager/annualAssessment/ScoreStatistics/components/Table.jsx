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
            fixed: true,
            align: 'center',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '报表名称',
            dataIndex: 'reportName'
          },
          {
            title: '填报企业数',
            align: 'center',
            dataIndex: 'fillNum'
          },
          {
            title: '平均得分',
            align: 'center',
            dataIndex: 'score'
          },
          {
            title: '60以下',
            align: 'center',
            dataIndex: 'oneNum'
          },
          {
            title: '60-69',
            align: 'center',
            dataIndex: 'twoNum'
          },
          {
            title: '70-79',
            align: 'center',
            dataIndex: 'threeNum'
          },
          {
            title: '80-89',
            align: 'center',
            dataIndex: 'fourNum'
          },
          {
            title: '90及以上',
            align: 'center',
            dataIndex: 'fiveNum'
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'operation' }
          }
        ],
        rowSelection: null
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
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.$router.push({
                    name: 'indicatorStatistics',
                    query: {
                      reportId: record.reportId,
                      year: record.year
                    }
                  })}
                >
                  指标统计
                </Button>
                {/*<Button*/}
                {/*  type="link"*/}
                {/*  size="small"*/}
                {/*  // onClick={() => this._setVisibleOfModal(record, 'visibleOfResults')}*/}
                {/*>*/}
                {/*  导出明细*/}
                {/*</Button>*/}
              </Space>
            )
          }
        }}
      />
    )
  }
}
