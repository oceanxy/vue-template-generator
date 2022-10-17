import forTableModal from '@/mixins/forModal/forTableModal'
import DragModal from '@/components/DragModal'
import { Table } from 'ant-design-vue'
import { mapGetters } from 'vuex'

export default {
  mixins: [forTableModal()],
  data() {
    return {
      // 此字段与 store 里的同名字段必须保持一致，用于控制该弹窗的可见性，默认值为 modal mixin 里的 visibleField 的值
      visibleField: 'visibleOfGrading',
      tableProps: {
        columns: [
          {
            title: '序号',
            width: 60,
            align: 'center',
            dataIndex: 'serialNum'
          },
          {
            title: '指标名称',
            dataIndex: 'targetName'
          },
          {
            title: '选项',
            dataIndex: 'optionValue'
          },
          {
            title: '分值',
            dataIndex: 'score'
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
    currentItem() {
      return this.getState('currentItem', this.moduleName)
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: { cancel: () => this.onCancel(this.visibleField) }
    }

    const tableAttributes = {
      props: {
        ...this.tableProps,
        dataSource: this.currentItem.targetOptionList
      },
      attrs: { class: 'bnm-table-in-modal' }
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <Table{...tableAttributes} />
      </DragModal>
    )
  }
}
