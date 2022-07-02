import './index.scss'
import { Alert, Form } from 'ant-design-vue'
import DragModal from '@/components/DragModal'
import MultiInput from './MultiInput'
import forModal from '@/mixins/forModal'
import { mapGetters } from 'vuex'
import { dispatch } from '@/utils/store'

export default Form.create({})({
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
      modalProps: {
        width: 400,
        okText: '确认选择'
      },
      visibleField: 'visibleOfChooseVenue'
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    hatcheryIds() {
      return this.getState('list', this.moduleName, this.submoduleName).map(item => item.id)
    },
    hatcheryTree() {
      return this.getState('hatcheryTree', this.moduleName, this.submoduleName)
    }
  },
  watch: {
    async visible(value) {
      if (value) {
        await dispatch(this.moduleName, 'getHatcheryTree', { id: this.$route.query.id })
      }
    }
  },
  methods: {
    onClose() {
      this.onCancel(this.visibleField)
      this.form.setFieldsValue({ hatcheryIds: [] })
    },
    async onSubmit() {
      const status = await this.$store.dispatch('getList', {
        moduleName: this.moduleName,
        submoduleName: this.submoduleName,
        additionalQueryParameters: {
          ids: this.form.getFieldValue('hatcheryIds').join()
        }
      })

      if (status) {
        this.onClose()
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: this.onClose,
        ok: () => this.onSubmit()
      }
    }

    return (
      <DragModal {...attributes} class={'modal-of-choose-venue'}>
        <Alert
          message="不同中心考核形式不同，请谨慎选择"
          banner
          closable
          type={'info'}
          class={'bnm-alert-info'}
        />
        <Form colon={false}>
          <Form.Item>
            {
              this.form.getFieldDecorator('hatcheryIds', {
                initialValue: this.hatcheryIds
              })(
                <MultiInput hatcheryTree={this.hatcheryTree} />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
