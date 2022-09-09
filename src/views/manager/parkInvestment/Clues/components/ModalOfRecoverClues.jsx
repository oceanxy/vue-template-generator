import '../assets/styles/index.scss'
import DragModal from '@/components/DragModal'
import forModal from '@/mixins/forModal'
import { message } from 'ant-design-vue'

export default {
  mixins: [forModal()],
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
  methods: {
    async onSubmit() {
      this.modalProps.confirmLoading = true

      const response = await this.$store.dispatch('custom', {
        moduleName: this.moduleName,
        visibleField: this.visibleField,
        isFetchList: true,
        customApiName: 'takeBackClues',
        payload: this.currentItem
      })

      this.modalProps.confirmLoading = false

      if (response.status) {
        message.success('操作成功！')
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit({ customApiName: 'takeBackClues' })
      }
    }

    return <DragModal {...attributes}>
      收回线索后，对应的人员将不可对线索进行跟进，请谨慎操作
    </DragModal>
  }
}
