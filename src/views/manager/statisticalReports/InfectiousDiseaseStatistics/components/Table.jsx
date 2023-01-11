import '../assets/styles/index.scss'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable({ isFetchList: false })],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 70,
            align: 'center',
            fixed: true,
            scopedSlots: { customRender: 'serialNumber' }
          },
          {
            title: '传染病',
            align: 'center',
            dataIndex: 'fullName'
          },
          {
            title: '发病例数',
            align: 'center',
            dataIndex: 'idNumber'
          },
          {
            title: '发病率（%）',
            align: 'center',
            dataIndex: 'peObjOrgName'
          }
        ],
        rowSelection: null
      }
    }
  }
}
