import '../assets/styles/index.scss'
import { Button, Dropdown, Icon, Menu, Space, Table, Tag } from 'ant-design-vue'
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
            title: '体检时间',
            width: 140,
            align: 'center',
            fixed: true,
            dataIndex: 'createTimeStr'
          },
          {
            title: '姓名',
            width: 80,
            align: 'center',
            fixed: true,
            dataIndex: 'fullName'
          },
          {
            title: '身份证号',
            width: 170,
            dataIndex: 'idNumber'
          },
          {
            title: '学校名称',
            width: 200,
            dataIndex: 'peObjOrgName'
          },
          {
            title: '年级',
            width: 60,
            align: 'center',
            dataIndex: 'grade'
          },
          {
            title: '班级',
            width: 60,
            align: 'center',
            dataIndex: 'classNumber'
          },
          {
            title: '性别',
            width: 60,
            align: 'center',
            dataIndex: 'genderStr'
          },
          {
            title: '年龄',
            align: 'center',
            width: 60,
            dataIndex: 'age'
          },
          {
            title: '身高（cm）',
            width: 100,
            align: 'center',
            dataIndex: 'heightStr'
          },
          {
            title: '体重（kg）',
            align: 'center',
            width: 100,
            dataIndex: 'weightStr'
          },
          {
            title: 'BMI',
            align: 'center',
            width: 60,
            dataIndex: 'bmi'
          },
          {
            title: '收缩压（mmHg）',
            align: 'center',
            width: 90,
            dataIndex: 'systolicPressure'
          },
          {
            title: '舒张压（mmHg）',
            align: 'center',
            width: 90,
            dataIndex: 'diastolicPressure'
          },
          {
            title: '脉搏（bpm）',
            align: 'center',
            width: 80,
            dataIndex: 'pulseNum'
          },
          {
            title: '肺活量（ml）',
            align: 'center',
            width: 80,
            dataIndex: 'vc'
          },
          {
            title: '左眼视力',
            align: 'center',
            width: 80,
            dataIndex: 'leftVision'
          },
          {
            title: '右眼视力',
            align: 'center',
            width: 80,
            dataIndex: 'rightVision'
          },
          {
            title: '营养情况',
            align: 'center',
            width: 80,
            dataIndex: 'conclusionLevelName'
          },
          {
            title: '发育情况',
            align: 'center',
            width: 80,
            dataIndex: 'development'
          },
          {
            title: '体型',
            align: 'center',
            width: 80,
            dataIndex: 'size'
          }
        ],
        rowSelection: null
      }
    }
  },
  methods: {
    async onDetailsClick(record) {
      await this.$router.push({
        name: 'businessesDetails',
        query: { bid: record.id } // businessId
      })
    },
    async onShortMessage(record) {
      await this._setVisibleOfModal(record, 'visibleOfShortMessage')
    },
    async onSuggestions(record) {
      await this._setVisibleOfModal(record, 'visibleOfSuggestions')
    },
    async onPaymentRecords(record) {
      await this._setVisibleOfModal(record, 'visibleOfPaymentRecords')
    },
    async onBills(record) {
      await this._setVisibleOfModal(record, 'visibleOfBills')
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
            companyName: (text, record) => (
              <span class={'tg-table-field-highlight'}>
                {record.companyName}
              </span>
            ),
            contactAddress: (text, record) => (
              <ul
                style={{
                  paddingLeft: '20px',
                  marginBottom: 0
                }}
              >
                {
                  record.contactAddress?.split(',').map(item => (
                    <li>{item || '-'}</li>
                  ))
                }
              </ul>
            ),
            signingStatus: (text, record) => (
              <Tag color={['', '', 'green', '', '', 'red', 'orange'][+record.signingStatus - 1]}>
                {record.signingStatusStr}
              </Tag>
            ),
            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onDetailsClick(record)}
                >
                  查看详情
                </Button>
                <Dropdown>
                  <Button type="link">
                    企业服务
                    <Icon
                      type={'caret-down'}
                      class="caret-down"
                    />
                  </Button>
                  <Menu slot="overlay">
                    <Menu.Item onClick={() => this.onBills(record)}>账单查询</Menu.Item>
                    <Menu.Item onClick={() => this.onPaymentRecords(record)}>缴费记录</Menu.Item>
                    <Menu.Item onClick={() => this.onSuggestions(record)}>投诉建议</Menu.Item>
                    <Menu.Item onClick={() => this.onShortMessage(record)}>发送短信</Menu.Item>
                  </Menu>
                </Dropdown>
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
