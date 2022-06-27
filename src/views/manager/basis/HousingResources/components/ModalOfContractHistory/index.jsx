import './index.scss'
import { Form } from 'ant-design-vue'
import forTableModal from '@/mixins/forModal/forTableModal'
import forModuleName from '@/mixins/forModuleName'
import DragModal from '@/components/DragModal'
import Inquiry from './components/Inquiry'
import Table from './components/Table'

export default Form.create({})({
  provide() {
    return {
      visibleField: this.visibleField
    }
  },
  name: 'HousingResources-ContractHistory',
  mixins: [forModuleName(true), forTableModal()],
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
      // 此字段与 store 里的同名字段必须保持一致，用于控制该弹窗的可见性，默认值为 modal mixin 里的 visibleField 的值
      visibleField: 'visibleOfContractHistory'
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
      <DragModal {...attributes} class={'modal-of-contract-history'}>
        <Inquiry />
        <Table />
      </DragModal>
    )
  }
})
