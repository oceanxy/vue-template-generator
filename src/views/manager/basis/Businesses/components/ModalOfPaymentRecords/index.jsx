import { Form } from 'ant-design-vue'
import forTableModal from '@/mixins/forModal/forTableModal'
import forModuleName from '@/mixins/forModuleName'
import DragModal from '@/components/DragModal'
import Table from './components/Table'

export default Form.create({})({
  name: 'Businesses-PaymentRecords',
  mixins: [forModuleName(true), forTableModal()],
  data() {
    return {
      // 此字段与 store 里的同名字段必须保持一致，用于控制该弹窗的可见性，默认值为 modal mixin 里的 visibleField 的值
      visibleField: 'visibleOfPaymentRecords'
    }
  },
  provide() {
    return { visibleField: this.visibleField }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: { cancel: () => this.onCancel(this.visibleField) }
    }

    return (
      <DragModal {...attributes} class={'bnm-table-modal'}>
        {/*<Inquiry />*/}
        <Table />
      </DragModal>
    )
  }
})
