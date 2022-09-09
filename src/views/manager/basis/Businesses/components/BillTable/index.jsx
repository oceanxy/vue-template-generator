import './index.scss'
import { Button, Dropdown, Icon, Menu, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import TGPagination from '@/components/TGPagination'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '账单',
            dataIndex: ''
          },
          {
            title: '出账日',
            dataIndex: 'appName'
          },
          {
            title: '账单金额',
            dataIndex: 'remark'
          },
          {
            title: '摘要',
            align: 'center',
            dataIndex: 'zz'
          },
          {
            title: '企业类型',
            align: 'center',
            dataIndex: 'xx'
          },
          {
            title: '状态',
            align: 'center',
            width: 60,
            scopedSlots: { customRender: 'status' }
          }
        ]
      }
    }
  },
  render() {
    return (
      <div class={'bnm-businesses-details-bill'}>
        <Table
          ref={`${this.moduleName}Table`}
          loading={this.getLoading(this.moduleName)}
          {...{ props: this.tableProps }}
          {...{
            scopedSlots: {
              // status: (text, record) => (
              //   <Switch
              //     checked={+record.status === 1}
              //     onChange={checked => this.onStatusChange({ checked, record })}
              //   />
              // ),
              operation: (text, record) => (
                <Space>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => this.onDetailsClick(record)}
                  >
                    查看详情
                  </Button>
                  <Button
                    type="link"
                    size="small"
                    onClick={() => this.onAddClick(record)}
                  >
                    企业服务
                  </Button>
                  <Dropdown>
                    <Icon type="caret-down" class="caret-down" />
                    <Menu slot="overlay">
                      <Menu.Item>重置密码</Menu.Item>
                      <Menu.Item>账单查询</Menu.Item>
                      <Menu.Item>缴费记录</Menu.Item>
                      <Menu.Item>投诉建议</Menu.Item>
                    </Menu>
                  </Dropdown>
                </Space>
              )
            }
          }}
        />
        <TGPagination />
      </div>
    )
  }
}
