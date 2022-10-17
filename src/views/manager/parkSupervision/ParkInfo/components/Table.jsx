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
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '楼栋',
            width: 100,
            dataIndex: 'buildName'
          },
          {
            title: '所属中心',
            width: 140,
            dataIndex: 'parkName'
          },
          {
            title: '房源',
            width: 200,
            dataIndex: 'roomNum'
          },
          {
            title: '签约率（%）',
            width: 100,
            dataIndex: 'signingRate'
          },
          {
            title: '企业数',
            width: 60,
            dataIndex: 'companyNum'
          },
          {
            title: '监管单位',
            width: 200,
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
        {...{ scopedSlots: { serialNumber: (text, record, index) => index + 1 } }}
      />
    )
  }
}
