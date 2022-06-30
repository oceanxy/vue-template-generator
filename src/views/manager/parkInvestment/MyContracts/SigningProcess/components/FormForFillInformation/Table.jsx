import './index.scss'
import { Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable()],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '中心',
            dataIndex: ''
          },
          {
            title: '楼栋',
            dataIndex: 'appName'
          },
          {
            title: '房间',
            dataIndex: 'remark'
          },
          {
            title: '面积（㎡）',
            align: 'center',
            dataIndex: 'zz'
          },
          {
            title: '装修',
            align: 'center',
            dataIndex: 'xx'
          },
          {
            title: '配套详情',
            align: 'center',
            dataIndex: 'ccC'
          }
        ],
        rowSelection: null
      }
    }
  },
  methods: {
    onReSignClick(record) {
      this.$router.push({ name: 'signingProcess' })
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
            // status: (text, record) => (
            //   <Switch
            //     checked={+record.status === 1}
            //     onChange={checked => this.onStatusChange(checked, record)}
            //   />
            // ),
          }
        }}
      />
    )
  }
}
