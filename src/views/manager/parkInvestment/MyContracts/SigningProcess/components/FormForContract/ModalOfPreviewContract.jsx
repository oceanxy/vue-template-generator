import './index.scss'
import forModal from '@/mixins/forModal'
import { mapGetters } from 'vuex'
import { Button, Checkbox, Spin } from 'ant-design-vue'
import DragModal from '@/components/DragModal'
import apis from '@/apis'

export default {
  inject: ['submoduleName'],
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
      visibleField: 'visibleOfPreviewContract',
      loading: false,
      submitLoading: false,
      submitButtonDelay: 10,
      userConfirmation: false,
      timing: undefined, // 按钮倒计时计时器
      previewUrl: '',
      modalProps: {
        width: 1200,
        destroyOnClose: true,
        footer: () => (
          <div class={'bnm-preview-container-container'}>
            <Checkbox
              vModel={this.userConfirmation}
              onChange={this.onCheckboxChange}
            >
              我已认真核对并确认合同无误
            </Checkbox>
            <Button
              class={'btn'}
              onClick={() => this.onCancel(this.visibleField)}
            >
              取消
            </Button>
            <Button
              type={'primary'}
              onClick={this.onSubmit}
              disabled={this.submitButtonDelay > 0 || !this.userConfirmation}
              loading={this.submitLoading}
            >
              {
                `提交审核${this.submitButtonDelay ? `（${this.submitButtonDelay}s）` : ''}`
              }
            </Button>
          </div>
        )
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    templateId() {
      return this.getState('selectedRowKeys', this.moduleName, this.submoduleName)[0]
    }
  },
  watch: {
    async visible(value) {
      if (value) {
        this.loading = true

        const response = await apis.getContractPreview({
          id: this.$route.query.id,
          templateId: this.templateId
        })

        this.loading = false

        const blob = new Blob([response], { type: 'application/pdf' })
        this.previewUrl = window.URL.createObjectURL(blob)

        // 按钮倒计时
        this.calcSubmitButtonDelay()
      } else {
        clearInterval(this.timing)
        this.submitButtonDelay = 10
        this.userConfirmation = false
        this.previewUrl = ''
      }
    }
  },
  methods: {
    async onSubmit() {
      this.submitLoading = true
      const response = await apis.step3OfSubmitContract({ id: this.$route.query.id })
      this.submitLoading = false

      if (response.status) {
        await this.$store.dispatch('getDetails', {
          moduleName: this.moduleName,
          payload: { id: this.$route.query.id }
        })
      }
    },
    onCheckboxChange(e) {
      this.userConfirmation = e.target.checked
    },
    calcSubmitButtonDelay() {
      this.timing = setInterval(() => {
        this.submitButtonDelay = this.submitButtonDelay - 1

        if (this.submitButtonDelay <= 0) {
          clearInterval(this.timing)
        }
      }, 1000)
    }
  },
  beforeDestroy() {
    clearInterval(this.timing)
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
        <Spin spinning={this.loading}>
          <iframe
            src={this.previewUrl}
            frameBorder="0"
            height="500"
            scrolling="yes"
            width="100%"
          />
        </Spin>
      </DragModal>
    )
  }
}
