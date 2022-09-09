import './index.scss'
import { Form, Input, message, Radio, Select, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import MultiInput from './components/MultiInput'
import { cloneDeep, debounce } from 'lodash'
import { mapGetters } from 'vuex'
import ModalOfTemplateItems from '@/views/manager/dataCollection/ReportForms/components/ModalOfTemplateItems'

export default Form.create({})({
  mixins: [forFormModal()],
  provide() {
    return { moduleName: this.moduleName }
  },
  data() {
    return {
      modalProps: {
        width: 1440,
        destroyOnClose: true
        // footer: [
        //   <Button onClick={() => this.onCancel()}>取消</Button>,
        //   // <Button onClick={() => this.onCancel(this.visibleField)}>预览</Button>,
        //   <Button type={'primary'} onClick={() => this.handleSubmit()}>保存</Button>
        // ]
      },
      // 填报内容内选择器已选中的模版ID
      templateIdSelected: undefined
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
      return this.getState('indicators', 'common')
    },
    templates() {
      return this.getState('templates', this.moduleName)
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
          moduleName: 'common',
          stateName: 'indicators',
          customApiName: 'getIndicatorsForSelect',
          payload: { fullName: keyword }
        })
      }
    },
    async onSearchTemplate(keyword) {
      if (keyword) {
        await this.$store.dispatch('getListForSelect', {
          moduleName: this.moduleName,
          stateName: 'templates',
          customApiName: 'getItemsOfTemplate',
          payload: { fullName: keyword }
        })
      }
    },
    async onTemplateSelected(template) {
      // 获取填报项中所有已选择的 targetId 和 fullName，并去重
      const existItemWithTargetId = [...new Set(this.form.getFieldValue('itemList').map(item => item.targetId))]
      const existItemWithTargetName = [...new Set(this.form.getFieldValue('itemList').map(item => item.fullName))]

      // 从新选择的模版的填报项中排除掉已选择的 targetId 和 fullName。
      const templateSelected = {
        ...template,
        itemList: template.itemList.filter(item => {
          if (item.targetId) {
            return !existItemWithTargetId.includes(item.targetId)
          } else {
            return !existItemWithTargetName.includes(item.fullName)
          }
        })
      }

      if (templateSelected.itemList.length) {
        this.$store.commit('setDetails', {
          value: { templateSelected },
          moduleName: this.moduleName,
          merge: true
        })

        await this.$store.dispatch('setModalVisible', {
          statusField: 'visibleOfTemplateItems',
          statusValue: true,
          moduleName: this.moduleName
        })
      } else {
        message.warning('该模版当前无可用填报项，请重新选择！')
      }

      this.templateIdSelected = undefined
    },
    importTemplate(itemsSelected) {
      const old = this.form.getFieldValue('itemList')
      const items = cloneDeep(itemsSelected)

      items.forEach(item => {
        item.id = Math.random()
        item.serialNum = +item.serialNum + +old.length
      })

      this.form.setFieldsValue({ itemList: old.concat(items) })
    },
    handleSubmit() {
      this.onSubmit({
        customValidation: () => {
          let validationResult
          const itemList = this.form.getFieldValue('itemList')
          const temp = itemList.filter(item => {
            if (item.modType === 1 || item.modType === 2) {
              return item.fullName && item.description && item.itemOptionList?.length
            } else {
              return item.fullName && item.description
            }
          })

          if (itemList.length && temp.length === itemList.length) {
            this.form.setFields({ itemList: { value: itemList } })
            validationResult = true
          } else {
            this.form.setFields({
              itemList: {
                value: itemList,
                errors: [new Error('请补全填报内容！')]
              }
            })
            validationResult = false
          }

          return validationResult
        }
      })
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.handleSubmit()
      }
    }

    // 处理回填数据
    const initialValue = cloneDeep(this.details)

    if (initialValue.itemList) {
      initialValue.itemList.forEach(item => {
        item.isRequired = !!+item.isRequired
        item.status = !!+item.status
        item.optionValueList = item.itemOptionList.map(option => option.optionValue)
      })
    }

    return (
      <DragModal {...attributes} class={'bnm-dc-templates-edit'}>
        <Form class="bnm-form-grid">
          <Form.Item label="模版名称" class={'half'}>
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
                <Input placeholder="请输入模版名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="类型" class={'half'}>
            {
              this.form.getFieldDecorator('templateType', {
                initialValue: this.currentItem.templateType || 1,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请选择模版类型!',
                    trigger: 'change'
                  }
                ]
              })(
                <Radio.Group>
                  <Radio value={1}>数据采集</Radio>
                  <Radio value={2}>问卷调查</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="填报项">
            <Select
              vModel={this.templateIdSelected}
              placeholder={'输入名称搜索模版，可从选中模版导入填报项'}
              showSearch
              filterOption={false}
              onSearch={debounce(this.onSearchTemplate, 300)}
              notFoundContent={this.templates.loading ? <Spin /> : undefined}
            >
              {
                this.templates.list.map(item => (
                  <Select.Option
                    value={item.id}
                    title={item.fullName}
                    onClick={() => this.onTemplateSelected(item)}
                  >
                    {item.fullName}
                  </Select.Option>
                ))
              }
            </Select>
            {
              this.form.getFieldDecorator('itemList', {
                initialValue: initialValue.itemList || [],
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请补全填报内容！',
                    trigger: 'change'
                  }
                ]
              })(
                <MultiInput
                  visible={this.visible}
                  mode={this.currentItem.id ? 'edit' : 'add'}
                  indicators={this.indicators}
                  onSearch={this.onSearch}
                  parentForm={this.form}
                  affixTarget={() => document.querySelector('.bnm-dc-templates-edit .ant-modal-body')}
                  affixOffsetTop={-42}
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
                  autoSize={{
                    minRows: 6
                  }}
                />
              )
            }
          </Form.Item>
        </Form>
        <ModalOfTemplateItems modalTitle={'引用模版'} onChange={this.importTemplate} />
      </DragModal>
    )
  }
})
