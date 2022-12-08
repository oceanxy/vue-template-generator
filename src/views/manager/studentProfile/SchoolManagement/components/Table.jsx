import '../assets/styles/index.scss'
import { Table, Tag, Switch, Button, Space } from 'ant-design-vue'
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
            title: '学校名称',
            width: 260,
            fixed: true,
            dataIndex: 'fullName'
          },
          {
            title: '学校简称',
            width: 280,
            dataIndex: 'shortName'
          },
          {
            title: '街道',
            width: 250,
            dataIndex: 'streetName'
          },
          {
            title: '办学类型',
            width: 120,
            dataIndex: 'schoolTypeStr'
          },
          {
            title: '办别',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'category' }
          },
          {
            title: '城乡类型',
            width: 100,
            align: 'center',
            scopedSlots: { customRender: 'urbanRuralType' }
          },
          {
            title: '是否寄宿制',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'isBoardingSchool' }
          },
          {
            title: '是否分校',
            width: 120,
            align: 'center',
            scopedSlots: { customRender: 'isBranchSchool' }
          },
          {
            title: '是否校幼一体',
            align: 'center',
            width: 120,
            scopedSlots: { customRender: 'isContainKindergarten' }
          },
          {
            title: '校长',
            align: 'center',
            width: 100,
            dataIndex: 'principal'
          },
          {
            title: '经度',
            width: 110,
            dataIndex: 'longitude	'
          },
          {
            title: '纬度',
            width: 110,
            dataIndex: 'latitude'
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
            align: 'center',
            fixed: 'right',
            width: 120,
            scopedSlots: { customRender: 'operation' }
          }
        ]
      }
    }
  },
  render() {
    return (
      <Table
        ref={`${this.moduleName}Table`}
        {...this.attributes}
        {...{
          scopedSlots: {
            serialNumber: this.getConsecutiveSerialNumber,
            category: (text, record) => {
              return record.category === 1 ? <span>公办</span> : <span>民办</span>
            },
            urbanRuralType: (text, record) => {
              return record.urbanRuralType === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
            },
            isBoardingSchool: (text, record) => {
              return record.isBoardingSchool === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
            },
            isBranchSchool: (text, record) => {
              return record.isBranchSchool === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
            },
            isContainKindergarten: (text, record) => {
              return record.isContainKindergarten === 1 ? <Tag color="green">是</Tag> : <Tag color="red">否</Tag>
            },
            status: (text, record) => {
              return (
                <Switch
                  checked={record.status === 1}
                  onChange={checked => this.onStatusChange({ checked, record })}
                />
              )
            },

            operation: (text, record) => (
              <Space>
                <Button
                  type="link"
                  size="small"
                  onClick={() => this.onEditClick(record)}
                >
                  修改
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
