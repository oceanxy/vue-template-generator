import '../assets/styles/index.scss'
import forModal from '@/mixins/forModal'
import { mapState } from 'vuex'
import DragModal from '@/components/DragModal'

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
        width: 690
      },
      visibleField: 'visibleOfQuestionnaireSwitch'
    }
  },
  computed: mapState({
    allSiteApps: 'allSiteApps',
    allFunctionalModules: 'allFunctionalModules'
  }),
  watch: {
    visible(value) {
      if (value) {
        this.modalProps.title = this.title.replace('{action}', this.currentItem.id ? '发布' : '结束')
      } else {
        this.form.resetFields()
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel('visibleOfQuestionnaireSwitch'),
        ok: this.onSubmit
      }
    }

    return (
      <DragModal {...attributes}>
        是否确认发布/结束问卷（问卷有效期结束后自动结束）
      </DragModal>
    )
  }
}
