import forTable from '@/mixins/forTable'
import { Button, Space } from 'ant-design-vue'

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
            title: '上报日期',
            dataIndex: 'reportTimeStr'
          },
          {
            title: '学校',
            width: 220,
            dataIndex: 'schoolName'
          },
          {
            title: '班级',
            width: 120,
            align: 'center',
            dataIndex: 'gradeClassStr'
          },
          {
            title: '班级人数',
            width: 80,
            align: 'center',
            dataIndex: 'classPeopleNum'
          },
          {
            title: '异常人数',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'abnormalNum' }
          },
          {
            title: '上报时段',
            width: 80,
            align: 'center',
            scopedSlots: { customRender: 'reportTimePeriod' }
          },
          {
            title: '上报状态',
            width: 80,
            align: 'center',
            dataIndex: 'reportStatusStr'
          },
          {
            title: '上报人',
            dataIndex: 'reportorName'
          },
          {
            title: '填报时间',
            dataIndex: 'fillTimeStr'
          },
          {
            title: '操作',
            fixed: 'right',
            align: 'center',
            width: 200,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      },
      scopedSlots: {
        abnormalNum: (text, record) => {
          return record.reportStatus === 1
            ? '-'
            : record.abnormalNum ? <span style={'color: red'}>{record.abnormalNum}</span> : 0
        },
        reportTimePeriod: (text, record) => {
          return ['晨检', '午检'][record.reportTimePeriod - 1]
        },
        operation: (text, record) => (
          <Space>
            {
              record.reportStatus !== 1
                ? [
                  <Button
                    type="link"
                    size="small"
                    onClick={() => this.$router.push({
                      name: 'reportDetails',
                      query: {
                        reportId: record.id,
                        orgId: this.search.orgId,
                        orgType: this.search.orgType
                      }
                    })}
                  >
                    查看
                  </Button>,
                  <Button
                    type="link"
                    size="small"
                    onClick={() => this._setVisibilityOfModal(record)}
                  >
                    添加异常
                  </Button>
                ]
                : (
                  <Button
                    type="link"
                    size="small"
                    onClick={() => this._setVisibilityOfModal(record, 'visibilityOfOneClickReport')}
                  >
                    一键上报
                  </Button>
                )
            }
          </Space>
        )
      }
    }
  },
  computed: {
    search() {
      return this.$store.state[this.moduleName].search
    }
  }
}
