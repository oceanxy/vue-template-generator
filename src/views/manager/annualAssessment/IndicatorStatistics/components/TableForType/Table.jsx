import '../../assets/styles/index.scss'
import { Table } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  inject: ['moduleName'],
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
            title: '企业',
            width: 100,
            dataIndex: 'companyName'
          },
          {
            title: '考核结果',
            width: 100,
            scopedSlots: { customRender: 'result' }
          },
          {
            title: '得分',
            align: 'center',
            width: 100,
            dataIndex: 'score'
          },
          {
            title: '填写时间',
            width: 180,
            dataIndex: 'createTimeStr'
          }
        ],
        rowKey: 'id',
        dataSource: [],
        pagination: false,
        size: 'middle'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    loading() {
      return this.getState('loading', this.moduleName)
    },
    search() {
      return this.getState('search', this.moduleName)
    },
    list() {
      return this.getState('list', this.moduleName)
    }
  },
  watch: {
    search: {
      deep: true,
      async handler(value) {
        if (value.reportId && value.itemId) {
          await this.$store.dispatch('getList', { moduleName: this.moduleName })
        }
      }
    }
  },
  render() {
    const attributes = {
      props: {
        ...this.tableProps,
        dataSource: this.list || [],
        loading: this.loading
      }
    }

    return (
      <Table
        class={'results-table'}
        ref={`${this.moduleName}Table`}
        {...attributes}
        {...{
          scopedSlots: { serialNumber: (text, record, index) => index + 1 + this.serialNumber },
          result: (text, record) => {
            if (record.modType === 5 || record.modType === 6) {
              return (
                <ol
                  style={{
                    paddingLeft: '20px',
                    marginBottom: 0
                  }}
                >
                  {
                    record.resultFile?.map(item => (
                      <li>
                        <a
                          target="_blank"
                          href={item.path}
                        >
                          {item.fileName}
                        </a>
                      </li>
                    ))
                  }
                </ol>
              )
            }

            return record.resultContent
          }
        }}
      />
    )
  }
}
