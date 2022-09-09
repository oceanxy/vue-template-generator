import { Button, Form, Table } from 'ant-design-vue'
import forTableModal from '@/mixins/forModal/forTableModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forTableModal()],
  data() {
    return {
      // 此字段与 store 里的同名字段必须保持一致，用于控制该弹窗的可见性，默认值为 modal mixin 里的 visibleField 的值
      visibleField: 'visibleOfDetails',
      modalProps: {
        width: 700,
        footer: <Button onClick={() => this.onCancel(this.visibleField)}>取消</Button>
      },
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            dataIndex: 'serialNum'
          },
          {
            title: '标题',
            dataIndex: 'itemName'
          },
          {
            title: '填写结果',
            dataIndex: 'resultContent'
          }
        ],
        rowKey: 'id',
        tableLayout: 'fixed',
        dataSource: [],
        pagination: false,
        scroll: {},
        size: 'middle'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    details() {
      return this.getState('details', this.moduleName)
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListForSelect', {
            moduleName: this.moduleName,
            stateName: 'details',
            customApiName: 'getResultsOfQuestionnaireRecords',
            payload: { id: this.currentItem.id }
          })
        }
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {cancel: () => this.onCancel(this.visibleField)}
    }

    const tableAttributes = {
      props: {
        ...this.tableProps,
        loading: this.details.loading,
        dataSource: this.details.list
      },
      attrs: {class: 'bnm-table-in-modal'}
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <Table {...tableAttributes} />
      </DragModal>
    )
  }
})
