import '../assets/styles/index.scss'
import { Button, Dropdown, Icon, Menu, Space, Table } from 'ant-design-vue'
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
            title: '场地',
            dataIndex: 'contactAddress'
          },
          {
            title: '企业',
            scopedSlots: { customRender: 'companyName' }
          },
          {
            title: '用户名',
            align: 'center',
            dataIndex: 'loginAccount'
          },
          {
            title: '签约类型',
            align: 'center',
            dataIndex: 'companyCategoryStr'
          },
          // {
          //   title: '标签',
          //   dataIndex: ''
          // },
          {
            title: '企业类型',
            dataIndex: 'companyTypeStr'
          },
          {
            title: '负责人',
            align: 'center',
            dataIndex: 'dutyPerson'
          },
          {
            title: '联系电话',
            dataIndex: 'dutyPersonMobile'
          },
          {
            title: '状态',
            align: 'center',
            width: 60,
            scopedSlots: { customRender: 'signingStatus' }
          },
          {
            title: '操作',
            key: 'operation',
            // fixed: 'right',
            align: 'center',
            width: 200,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  methods: {
    onDetailsClick(record) {
      this.$router.push({ name: 'businessesDetails' })
    },
    async onShortMessage(record) {
      await this._setVisibleOfModal(record, 'visibleOfShortMessage', this.moduleName)
    },
    async onSuggestions(record) {
      await this._setVisibleOfModal(record, 'visibleOfSuggestions', this.moduleName)
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
            companyName: (text, record) => (
              <span style={{ color: '#13c2c2', fontWeight: 'bolder' }}>
                {record.companyName}
              </span>
            ),
            signingStatus: (text, record) => record.signingStatusStr,
            operation: (text, record) => (
              <Space class="operation-space">
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
                    <Icon type={'caret-down'} class="caret-down" />
                  </Button>
                  <Menu slot="overlay">
                    <Menu.Item>账单查询</Menu.Item>
                    <Menu.Item>缴费记录</Menu.Item>
                    <Menu.Item onClick={() => this.onSuggestions(record)}>投诉建议</Menu.Item>
                    <Menu.Item onClick={() => this.onShortMessage(record)}>发送短信</Menu.Item>
                  </Menu>
                </Dropdown>
              </Space>
            )
          }
        }}
      />
    )
  }
}
