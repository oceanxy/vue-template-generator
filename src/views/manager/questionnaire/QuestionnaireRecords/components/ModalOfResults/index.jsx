import './index.scss'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import { Button } from 'ant-design-vue'
import Table from './components/Table'
import forModuleName from '@/mixins/forModuleName'
import { mapGetters } from 'vuex'

export default {
  name: 'QuestionnaireRecords-Results',
  mixins: [forModal(), forModuleName(true)],
  provide() {
    return {
      submoduleName: this.submoduleName
    }
  },
  props: {
    /**
     * 标题（可定义占位符）
     * “{action}” 为占位符，稍后会在 mixin 中替换为对应的字符，比如“新增”、“编辑”
     */
    modalTitle: {
      type: String,
      default: '{action}'
    }
  },
  data() {
    return {
      modalProps: {
        width: 700,
        footer: <Button onClick={() => this.onCancel(this.visibleField)}>取消</Button>
      },
      visibleField: 'visibleOfResults'
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
      on: {
        cancel: () => this.onCancel(this.visibleField)
      }
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        <Table />
      </DragModal>
    )
  }
}
