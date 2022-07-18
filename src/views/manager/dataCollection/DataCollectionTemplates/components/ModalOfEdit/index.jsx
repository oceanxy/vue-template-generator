import './index.scss'
import { Button, Form, Input, Radio } from 'ant-design-vue'
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
          <Button type={'primary'} onClick={() => this.onSubmit()}>保存</Button>
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
    },
    indicators() {
      return this.getState('indicators', this.moduleName)
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.onSearch(undefined)
        }

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
  methods: {
    async onSearch(keyword) {
      if (keyword || keyword === undefined) {
        await this.$store.dispatch('getListForSelect', {
          moduleName: this.moduleName,
          stateName: 'indicators',
          customApiName: 'getIndicatorsForSelect',
          payload: {
            fullName: keyword
          }
        })
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      props: { loading: true },
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({
          customValidation: () => {
            const temp = this.form
              .getFieldValue('itemList')
              .filter(item => item.fullName && item.optionValueList && item.description)

            return !!temp.length
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
      <DragModal {...attributes} class={'bnm-data-collection-templates-add-template'}>
        <Form
          class="bnm-form-grid"
        >
          <Form.Item label="模版名称" class={'half'}>
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [{ required: true, message: '请输入模版名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入模版名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="类型" class={'half'}>
            {
              this.form.getFieldDecorator('templateType', {
                initialValue: this.currentItem.templateType,
                rules: [{ required: true, type: 'number', message: '请选择模版类型!', trigger: 'change' }]
              })(
                <Radio.Group disabled={true}>
                  <Radio value={1}>数据采集</Radio>
                  <Radio value={2}>问卷调查</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="填报内容">
            {
              this.form.getFieldDecorator('itemList', {
                initialValue: initialValue.itemList || [],
                rules: [{ required: true, type: 'array', message: '请补全填报内容!', trigger: 'change' }]
              })(
                <MultiInput
                  indicators={this.indicators}
                  onSearch={this.onSearch}
                  templateType={this.currentItem.templateType}
                />
              )
            }
          </Form.Item>
          <Form.Item label="描述">
            {
              this.form.getFieldDecorator('description', {
                initialValue: this.currentItem.description
              })(
                <Input.TextArea
                  placeholder={'请输入模版描述'}
                  allowClear
                  autoSize={{ minRows: 4, maxRows: 6 }}
                />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
