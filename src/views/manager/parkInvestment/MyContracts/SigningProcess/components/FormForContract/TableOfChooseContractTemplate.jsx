import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'
import { mapGetters } from 'vuex'

export default {
  // 注册为子模块的组件需要注入的参数
  inject: ['submoduleName', 'visibleField'],
  mixins: [forTable()],
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    dataSource: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      tableProps: {
        columns: [
          {
            title: '模版名称',
            width: 200,
            dataIndex: 'templateName'
          },
          {
            title: '描述',
            dataIndex: 'description'
          },
          {
            title: '操作',
            align: 'center',
            width: 100,
            scopedSlots: { customRender: 'operation' }
          }
        ],
        size: 'middle'
      },
      contractTemplateId: ''
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    currentItem() {
      return this.getState('currentItem', this.moduleName)
    },
    details() {
      return this.getState('details', this.moduleName)
    },
    additionalQueryParameters() {
      return {
        id: this.currentItem.id
      }
    },
    selectedRowKeys() {
      return this.getState('selectedRowKeys', this.moduleName, this.submoduleName)
    }
  },
  created() {
    if (this.details.contractTemplateId) {
      this.contractTemplateId = this.details.contractTemplateId
    }
  },
  render() {
    const selectedRowKeys = this.selectedRowKeys[0] || this.contractTemplateId

    const attruibutes = {
      props: {
        ...this.tableProps,
        dataSource: this.dataSource,
        loading: this.loading,
        rowSelection: {
          ...this.tableProps.rowSelection,
          type: 'radio',
          selectedRowKeys: selectedRowKeys ? [selectedRowKeys] : []
        }
      },
      attrs: {
        class: 'bnm-table-in-modal'
      }
    }

    return (
      <Table
        {...attruibutes}
        {...{
          scopedSlots: {
            serialNumber: (text, record, index) => index + 1,
            operation: (text, record) => (
              <Space class="operation-space">
                <Button
                  type="link"
                  icon="preview"
                  size="small"
                  // onClick={() => this.onAddClick(record)}
                >
                  预览模版
                </Button>
              </Space>
            )
          }
        }}
      />
    )
  }
}
