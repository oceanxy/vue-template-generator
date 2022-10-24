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
            key: 'serialNumber',
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '企业',
            width: 250,
            key: 'companyName',
            scopedSlots: { customRender: 'companyName' }
          },
          {
            title: '场地',
            width: 200,
            key: 'contactAddress',
            scopedSlots: { customRender: 'contactAddress' }
          },
          {
            title: '用户名',
            align: 'center',
            width: 120,
            key: 'loginAccount',
            dataIndex: 'loginAccount'
          },
          {
            title: '签约类型',
            align: 'center',
            width: 100,
            key: 'companyCategoryStr',
            dataIndex: 'companyCategoryStr'
          },
          // {
          //   title: '标签',
          //   dataIndex: ''
          // },
          {
            title: '企业类型',
            width: 100,
            key: 'companyTypeStr',
            dataIndex: 'companyTypeStr'
          },
          {
            title: '负责人',
            align: 'center',
            width: 120,
            key: 'dutyPerson',
            dataIndex: 'dutyPerson'
          },
          {
            title: '联系电话',
            width: 120,
            key: 'dutyPersonMobile',
            dataIndex: 'dutyPersonMobile'
          },
          {
            title: '状态',
            align: 'center',
            fixed: 'right',
            width: 80,
            key: 'signingStatus',
            scopedSlots: { customRender: 'signingStatus' }
          },
          {
            title: '操作',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 220,
            scopedSlots: { customRender: 'operation' }
          }
        ]
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
              <span class={'bnm-table-field-highlight'}>
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
