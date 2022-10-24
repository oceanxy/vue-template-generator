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
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '单位名称',
            width: 200,
            dataIndex: 'unitName'
          },
          {
            title: '地址',
            width: 200,
            scopedSlots: { customRender: 'address' }
          },
          {
            title: '工商注册号',
            width: 150,
            dataIndex: 'icrn'
          },
          {
            title: '组织机构代码',
            width: 150,
            dataIndex: 'oc'
          },
          {
            title: '统一社会信用代码',
            width: 150,
            dataIndex: 'uscc'
          },
          {
            title: '纳税人识别号',
            width: 180,
            dataIndex: 'tin'
          },
          {
            title: '账号',
            width: 150,
            dataIndex: 'loginAccount'
          },
          {
            title: '法人',
            width: 80,
            dataIndex: 'legalPerson'
          },
          {
            title: '法人身份证',
            width: 150,
            dataIndex: 'legalPersonIdCard'
          },
          {
            title: '法人手机',
            width: 100,
            dataIndex: 'legalPersonMobile'
          },
          {
            title: '状态',
            align: 'center',
            width: 60,
            fixed: 'right',
            scopedSlots: { customRender: 'status' }
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
  methods: {},
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
            address: (text, record) => `${
              record.provinceName || ''
            }${
              record.cityName || ''
            }${
              record.countyName || ''
            }${
              record.address || ''
            }`,
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
