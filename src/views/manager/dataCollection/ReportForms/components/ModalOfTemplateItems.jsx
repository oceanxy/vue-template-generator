import '../assets/styles/index.scss'
import forModal from '@/mixins/forModal'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'
import { Table } from 'ant-design-vue'

export default {
  mixins: [forModal()],
  data() {
    return {
      modalProps: {
        width: 900,
        okText: '选择',
        destroyOnClose: true
      },
      visibleField: 'visibleOfTemplateItems',
      selectedRows: []
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    visible() {
      return this.getState(this.visibleField, this.moduleName)
    },
    template() {
      return this.getState('details', this.moduleName)?.templateSelected ?? { itemList: [] }
    },
    dataSource() {
      return this.template.itemList
    }
  },
  methods: {
    async onSubmit() {
      this.modalProps.confirmLoading = true
      this.$emit('change', this.selectedRows)
      this.modalProps.confirmLoading = false

      this.onCancel(this.visibleField)
    },
    /**
     * 表格行change事件回调
     * @param selectedRowKeys {string[]} 当前选中行的ID
     * @param selectedRows {Object[]} 当前选中的数据对象
     * @returns {Promise<void>}
     */
    async onRowSelectionChange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit()
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        模版名称： {this.template.fullName}
        <Table
          rowSelection={{
            selections: true,
            // fixed: true,
            columnWidth: 50,
            onChange: this.onRowSelectionChange
          }}
          size={'middle'}
          rowKey={'id'}
          tableLayout={'fixed'}
          pagination={false}
          dataSource={this.template.itemList}
          class={'bnm-table-in-modal'}
          columns={[
            {
              title: '序号',
              width: 60,
              align: 'center',
              dataIndex: 'serialNum'
            },
            {
              title: '标题',
              dataIndex: 'fullName'
            },
            {
              title: '选项',
              scopedSlots: { customRender: 'itemOptionList' }
            },
            {
              title: '描述',
              dataIndex: 'description'
            },
            {
              title: '组件类型',
              width: 80,
              align: 'center',
              dataIndex: 'modTypeStr'
            },
            {
              title: '是否必填',
              width: 80,
              align: 'center',
              dataIndex: 'isRequiredStr'
            }
          ]}
          {...{
            scopedSlots: {
              itemOptionList: (text, record) => (
                <ul style={{ paddingLeft: '20px', marginBottom: 0 }}>
                  {
                    record.itemOptionList.map(item => (
                      <li>{item.optionValue}（{item.score}分）</li>
                    ))
                  }
                </ul>
              )
            }
          }}
        />
      </DragModal>
    )
  }
}
