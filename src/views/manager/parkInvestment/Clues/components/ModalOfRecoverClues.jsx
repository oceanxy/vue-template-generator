import '../assets/styles/index.scss'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'
import { dispatch } from '@/utils/store'

export default {
  mixins: [forModal()],
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
        width: 400,
        okText: '确定',
        confirmLoading: false
      },
      visibleField: 'visibleOfRecoverClues'
    }
  },
  computed: {
    currentItem() {
      return this.$store.state[this.moduleName].currentItem
    }
  },
  watch: {
    async visible(value) {
      if (value) {
        // await this.$store.dispatch('getAllFunctionalModules')
      }
    }
  },
  methods: {
    async onSubmit() {
      this.modalProps.confirmLoading = true
      const status = await dispatch(this.moduleName, 'takeBackClues', {
        ids: this.currentItem.id,
        moduleName: this.moduleName
      })
      this.modalProps.confirmLoading = false

      if (status) {
        this.onCancel(this.visibleField)
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: this.onSubmit
      }
    }

    return <DragModal {...attributes}>收回线索后，对应的人员将不可对线索进行跟进，请谨慎操作</DragModal>
  }
}
