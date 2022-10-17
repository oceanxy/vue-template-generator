import '../assets/styles/index.scss'
import { Table } from 'ant-design-vue'
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
            title: '姓名',
            dataIndex: 'fullName',
            width: 120
          },
          {
            title: '部门',
            width: 100,
            dataIndex: 'organName'
          },
          // {
          //   title: '工种',
          //   width: 150,
          //   dataIndex: 'workType'
          // },
          {
            title: '手机号码',
            width: 150,
            dataIndex: 'mobile'
          },
          {
            title: '待处理',
            align: 'center',
            width: 100,
            dataIndex: 'waitNum'
          },
          {
            title: '已处理',
            align: 'center',
            width: 100,
            dataIndex: 'acceptNum'
          },
          {
            title: '合计',
            align: 'center',
            width: 100,
            dataIndex: 'totalNum'
          }
          // {
          //   title: '操作',
          //   key: 'operation',
          //   fixed: 'right',
          //   align: 'center',
          //   width: 100,
          //   scopedSlots: { customRender: 'operation' }
          // }
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
            serialNumber: (text, record, index) => {
              return <span>{index + 1}</span>
            }
            // operation: (text, record) => (
            //   <Space>
            //     <Button type="link" size="small">
            //       导出明细
            //     </Button>
            //   </Space>
            // )
          }
        }}
      />
    )
  }
}
