import './index.scss'
import { Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  mixins: [forTable],
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '费项',
            dataIndex: ''
          },
          {
            title: '费项说明',
            dataIndex: 'appName'
          },
          {
            title: '单价',
            dataIndex: 'remark'
          },
          {
            title: '计费方式',
            align: 'center',
            dataIndex: 'zz'
          },
          {
            title: '优惠',
            align: 'center',
            dataIndex: 'xx'
          },
          {
            title: '小计',
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
            footer: record => (
              <div class={'bnm-contract-confirmation-table-footer'}>
                <span>费用汇总</span>
                <span>¥116853.00/季度</span>
              </div>
            )
          }
        }}
      />
    )
  }
}
