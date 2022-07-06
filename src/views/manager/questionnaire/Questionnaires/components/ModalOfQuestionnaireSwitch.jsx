import '../assets/styles/index.scss'
import forModal from '@/mixins/forModal'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'
import apis from '@/apis'

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
        width: 440,
        okText: '确定'
      },
      visibleField: 'visibleOfQuestionnaireSwitch'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    visible() {
      return this.getState('visibleOfQuestionnaireSwitch', this.moduleName)
    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(value) {
        if (value) {
          this.modalProps.title = this.modalTitle.replace(
            '{action}',
            +this.currentItem.reportStatus === 2 ? '发布' : '结束'
          )
        }
      }
    }
  },
  methods: {
    async onSubmit() {
      // TODO 发布/结束调用函数
      // await apis.
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel('visibleOfQuestionnaireSwitch'),
        ok: () => this.onSubmit()
      }
    }

    return (
      <DragModal {...attributes}>
        是否确认{+this.currentItem.reportStatus === 2 ? '发布' : '结束'}问卷（问卷有效期结束后自动结束）
      </DragModal>
    )
  }
}
