import '../assets/styles/index.scss'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable],
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
            title: '楼栋',
            dataIndex: 'buildName'
          },
          {
            title: '所属园区',
            dataIndex: 'parkName'
          },
          {
            title: '房源',
            dataIndex: 'roomNum'
          },
          {
            title: '签约率（%）',
            dataIndex: 'signingRate'
          },
          {
            title: '企业数',
            dataIndex: 'companyNum'
          },
          {
            title: '监管单位',
            dataIndex: 'regulationOrganName'
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
            serialNumber: (text, record, index) => index + 1
          }
        }}
      />
    )
  }
}
