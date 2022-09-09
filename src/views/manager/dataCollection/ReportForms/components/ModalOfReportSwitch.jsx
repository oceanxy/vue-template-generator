import '../assets/styles/index.scss'
import forModal from '@/mixins/forModal'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'
import { message } from 'ant-design-vue'

export default {
  mixins: [forModal()],
  data() {
    return {
      modalProps: {
        width: 440,
        okText: '确定'
      },
      visibleField: 'visibleOfReportSwitch'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    visible() {
      return this.getState(this.visibleField, this.moduleName)
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
      this.modalProps.confirmLoading = true

      const status = await this.$store.dispatch('custom', {
        moduleName: this.moduleName,
        visibleField: this.visibleField,
        isFetchList: true,
        customApiName: +this.currentItem.reportStatus === 2 ? 'publishQuestionnaires' : 'finishQuestionnaires',
        payload: {ids: this.currentItem.ids}
      })

      if (status) {
        message.success('操作成功！')
      }

      this.modalProps.confirmLoading = false
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(this.visibleField),
        ok: () => this.onSubmit()
      }
    }

    return (
      <DragModal {...attributes}>
        是否确认{+this.currentItem.reportStatus === 2 ? '发布' : '结束'}报表（报表有效期结束后自动结束）
      </DragModal>
    )
  }
}
