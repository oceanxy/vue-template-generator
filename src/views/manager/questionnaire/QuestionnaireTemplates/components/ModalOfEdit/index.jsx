import './index.scss'
import { Button, Form, Input } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import MultiInput from './components/MultiInput'
import { cloneDeep } from 'lodash'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 1440,
        destroyOnClose: true,
        footer: [
          <Button onClick={() => this.onCancel()}>取消</Button>,
          // <Button onClick={() => this.onCancel(this.visibleField)}>预览</Button>,
          <Button
            type={'primary'}
            onClick={() => this.handleSubmit()}
          >保存</Button>
        ]
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    currentItem() {
      return this.getState('currentItem', this.moduleName)
    },
    details() {
      return this.getState('details', this.moduleName)
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value && this.currentItem.id) {
          await this.$store.dispatch('getDetails', {
            moduleName: this.moduleName,
            payload: { id: this.currentItem.id }
          })
        } else {
          await this.$store.commit('setDetails', {
            value: {},
            moduleName: this.moduleName
          })
        }
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({
          customValidation: () => {
            const itemList = this.form
              .getFieldValue('itemList')
              .filter(item => item.fullName && item.description)

            if (itemList.length) {
              this.form.setFields({ itemList: { value: itemList } })
            } else {
              this.form.setFields({
                itemList: {
                  value: this.form.getFieldValue('itemList'),
                  errors: [new Error('请补全模版项目！')]
                }
              })
            }

            return !!itemList.length
          },
          customDataHandler: values => {
            const temp = cloneDeep(values)

            temp.itemList.forEach(item => {
              item.isRequired = item.isRequired ? 1 : 0
              item.status = item.status ? 1 : 0
            })

            return temp
          }
        })
      }
    }

    const initialValue = cloneDeep(this.details)

    if (initialValue.itemList) {
      initialValue.itemList.forEach(item => {
        item.isRequired = !!+item.isRequired
        item.status = !!+item.status
        item.optionValueList = item.itemOptionList.map(option => option.optionValue)
      })
    }

    return (
      <DragModal {...attributes} class={'bnm-questionnaire-templates-edit'}>
        <Form class="bnm-form-grid">
          <Form.Item
            label="模版名称"
            class={'half'}
          >
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入模版名称!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入模版名称"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="模版项目">
            {
              this.form.getFieldDecorator('itemList', {
                initialValue: initialValue.itemList || [],
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请补全模版项目!',
                    trigger: 'change'
                  }
                ]
              })(
                <MultiInput
                  affixOffsetTop={-42}
                  affixTarget={() => document.querySelector('.bnm-questionnaire-templates-edit .ant-modal-body')}
                />
              )
            }
          </Form.Item>
          <Form.Item label="描述">
            {
              this.form.getFieldDecorator('description', { initialValue: this.currentItem.description })(
                <Input.TextArea
                  placeholder={'请输入模版描述'}
                  allowClear
                  autoSize={{ minRows: 6 }}
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
