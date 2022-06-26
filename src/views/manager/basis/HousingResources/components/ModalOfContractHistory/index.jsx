import './index.scss'
import { Button, Form } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import Inquiry from './components/Inquiry'
import Table from './components/Table'

export default Form.create({})({
  inject: ['moduleName'],
  mixins: [forModal()],
  props: {
    /**
     * 标题（可定义占位符）
     * “{action}” 为占位符，稍后会在 mixin 中替换为对应的字符，比如“新增”、“编辑”
     */
    title: {
      type: String,
      default: '{action}'
    }
  },
  data() {
    return {
      // 此字段与 store 里的同名字段必须保持一致，用于控制该弹窗的可见性，默认值为 modal mixin 里的 visibleField 的值
      visibleField: 'visibleOfContractHistory',
      modalProps: {
        width: 800,
        title: this.title,
        footer: <Button onClick={() => this.onCancel(this.visibleField)}>关闭</Button>
      }
    }
  },
  computed: {
  },
  watch: {
    async visible(value) {
      if (value) {
        // await this.$store.dispatch('getAllFunctionalModules')
      }
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
