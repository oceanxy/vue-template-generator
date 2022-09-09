import './index.scss'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'
import forTableModal from '@/mixins/forModal/forTableModal'
import apis from '@/apis'
import { Button, Space, Table } from 'ant-design-vue'
import forTable from '@/mixins/forTable'

export default {
  inject: ['submoduleName'],
  mixins: [forTableModal(), forTable()],
  data() {
    return {
      modalProps: {
        width: 810,
        okText: '确认选择',
        footer: undefined,
        destroyOnClose: true,
        okButtonProps: { props: { disabled: false } }
      },
      tableProps: {
        rowSelection: {
          selections: true,
          columnWidth: 60,
          fixed: false
        },
        columns: [
          {
            title: '模版名称',
            width: 250,
            dataIndex: 'templateName'
          },
          {
            title: '描述',
            dataIndex: 'description'
          },
          {
            title: '操作',
            align: 'center',
            width: 120,
            scopedSlots: { customRender: 'operation' }
          }
        ],
        rowKey: 'id',
        dataSource: [],
        pagination: false,
        size: 'middle'
      },
      visibleField: 'visibleOfChooseContractTemplate',
      loading: false,
      dataSource: []
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
      return { id: this.currentItem.id }
    },
    selectedRowKeys() {
      return this.getState('selectedRowKeys', this.moduleName, this.submoduleName)
    }
  },
  watch: {
    async visible(value) {
      if (value) {
        this.loading = true

        const response = await apis.getContractTemplates({ id: this.details.id })

        this.loading = false

        if (response.status) {
          this.dataSource = response.data
        }
      }
    },
    selectedRowKeys: {
      immediate: true,
      handler(value) {
        this.modalProps.okButtonProps.props.disabled = !value.length
      }
    }
  },
  async created() {
    if (this.details.contractTemplateId) {
      this.tableProps.rowSelection.selectedRowKeys = [this.details.contractTemplateId]
    }
  },
  methods: {
    async onClose() {
      await this.$store.dispatch('setRowSelected', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        payload: {
          selectedRowKeys: [],
          selectedRows: []
        }
      })

      await this.onCancel(this.visibleField, this.submoduleName)
    },
    async onPreviewClick(record) {
      await this._setVisibleOfModal(
        { id: record.id },
        'visibleOfPreviewContract',
        this.submoduleName
      )
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: this.onClose,
        ok: () => {
          if (this.selectedRowKeys.length) {
            this.onCancel(this.visibleField, this.submoduleName)
          }
        }
      }
    }

    const selectedRowKeys = this.selectedRowKeys[0]
    const tableAttributes = {
      props: {
        ...this.tableProps,
        dataSource: this.dataSource,
        loading: this.loading,
        rowSelection: {
          ...this.tableProps.rowSelection,
          type: 'radio',
          selectedRowKeys: selectedRowKeys ? [selectedRowKeys] : []
        }
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <Table
          class={'bnm-table-in-modal'}
          {...tableAttributes}
          {...{
            scopedSlots: {
              serialNumber: (text, record, index) => index + 1,
              operation: (text, record) => (
                <Space>
                  <Button
                    type="link"
                    icon="preview"
                    size="small"
                    onClick={() => this.onPreviewClick(record)}
                  >
                    预览模版
                  </Button>
                </Space>
              )
            }
          }}
        />
      </DragModal>
    )
  }
}
