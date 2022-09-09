import './index.scss'
import forModal from '@/mixins/forModal'
import { mapGetters } from 'vuex'
import { Button, Checkbox, message, Spin } from 'ant-design-vue'
import DragModal from '@/components/DragModal'
import apis from '@/apis'

export default {
  inject: ['submoduleName'],
  mixins: [forModal()],
  props: {
    submit: {
      type: Function,
      required: true
    },
    preview: {
      type: Function,
      required: true
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
        destroyOnClose: true
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    details() {
      return this.getState('details', this.moduleName)
    },
    templateId() {
      return this.getState('selectedRowKeys', this.moduleName, this.submoduleName)[0]
    }
  },
  watch: {
    async visible(value) {
      if (value) {
        this.loading = true

        let response

        // 如果 currentItem 里面的 ID 存在，则为模版预览，否则为合同预览
        if (this.currentItem.id) {
          response = await apis.getPreviewOfContractTemplate({ id: this.currentItem.id })
        } else {
          response = await this.preview()
        }

        this.loading = false

        if (response?.type === 'application/json') {
          message.error('获取合同失败，请稍后再试！')
          this.onCancel(this.visibleField, this.submoduleName)
        } else {
          const blob = new Blob([response], { type: 'application/pdf' })

          this.previewUrl = window.URL.createObjectURL(blob)

          if (!this.currentItem.id) {
            // 按钮倒计时
            this.calcSubmitButtonDelay()
          }
        }
      } else {
        if (!this.currentItem.id) {
          clearInterval(this.timing)
          this.submitButtonDelay = 10
          this.userConfirmation = false
        }

        this.previewUrl = ''
        this.$store.commit('setCurrentItem', {
          value: { id: '' },
          moduleName: this.moduleName
        })
      }
    }
  },
  methods: {
    async onSubmit() {
      this.submitLoading = true

      await this.submit()

      this.submitLoading = false
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
    if (!this.currentItem.id) {
      clearInterval(this.timing)
    }
  },
  render() {
    const attributes = {
      attrs: {
        ...this.modalProps,
        footer: () => (
          <div class={'bnm-preview-container-container'}>
            <Checkbox
              vModel={this.userConfirmation}
              onChange={this.onCheckboxChange}
              style={this.currentItem.id ? { display: 'none' } : {}}
            >
              我已认真核对并确认合同无误
            </Checkbox>
            <Button
              class={'btn'}
              onClick={() => this.onCancel(this.visibleField, this.submoduleName)}
            >
              取消
            </Button>
            <Button
              type={'primary'}
              onClick={this.onSubmit}
              disabled={this.submitButtonDelay > 0 || !this.userConfirmation}
              loading={this.submitLoading}
              style={this.currentItem.id ? { display: 'none' } : {}}
            >
              {`确认提交${this.submitButtonDelay ? `（${this.submitButtonDelay}s）` : ''}`}
            </Button>
          </div>
        )
      },
      on: { cancel: () => this.onCancel(this.visibleField, this.submoduleName) }
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
