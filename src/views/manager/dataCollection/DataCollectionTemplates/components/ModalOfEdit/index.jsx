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
    },
    /**
     * 取填报项中所有已选择的 targetId 并去重
     * @returns {any[]}
     */
    selectedIndicatorIds() {
      return [
        ...new Set(
          this.form.getFieldValue('itemList')
            .map(item => item.targetId || item.id) // 筛选出所有项的targetId
            .filter(item => !!item) // 筛选掉空字符串
        )
      ]
    },
    currentAllIndicatorIds() {
      return this.indicators.list.map(indicator => indicator.id)
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.onSearch()
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
    async onSearch() {
      await this.$store.dispatch('getListForSelect', {
        moduleName: 'common',
        stateName: 'indicators',
        customApiName: 'getIndicatorsForSelect'
      })
    },
    async onSearchTemplate(keyword) {
      if (keyword) {
        await this.$store.dispatch('getListForSelect', {
          moduleName: this.moduleName,
          stateName: 'templates',
          customApiName: 'getItemsOfTemplate'
        })
      }
    },
    async onTemplateSelected(template) {
      const templateSelected = cloneDeep(template)

      if (templateSelected.itemList.length) {
        this.$store.commit('setDetails', {
          value: {
            templateSelected,
            selectedIndicatorIds: this.selectedIndicatorIds
          },
          moduleName: this.moduleName,
          merge: true
        })

        await this.$store.dispatch('setModalVisible', {
          statusField: 'visibleOfTemplateItems',
          statusValue: true,
          moduleName: this.moduleName
        })
      } else {
        message.warning('当前模板内的所有填报项已经添加成功，请勿重复添加！')
      }

      this.$nextTick(() => {
        this.templateIdSelected = undefined
      })
    },
    onAddItem() {
      this.$refs.searchTemplate.$el.scrollIntoView()
    },
    onRowIndicatorChange() {
      this.modalProps.okButtonProps.props.disabled = false
    },
    importTemplate(itemsSelected) {
      const old = this.form.getFieldValue('itemList')
      const items = cloneDeep(itemsSelected)
      const additionalIndicator = []

      items.forEach((item, index) => {
        item.serialNum = +old.length + index + 1

        // 更新填报项组件需要的指标数据，以防回填后出现只显示ID，不显示具体名称的问题
        if (item.targetId && !this.currentAllIndicatorIds.includes(item.targetId)) {
          additionalIndicator.push({
            fullName: `${item.fullName}（从${item.objName}导入）`,
            id: item.targetId
          })
        }
      })

      if (additionalIndicator.length) {
        this.$store.commit('setDetails', {
          value: {
            ...this.indicators,
            list: this.indicators.list.concat(additionalIndicator)
          },
          moduleName: 'common',
          stateName: 'indicators'
        })
      }

      this.form.setFieldsValue({ itemList: old.concat(items) })
      this.modalProps.okButtonProps.props.disabled = false
    },
    handleSubmit() {
      this.onSubmit({
        customValidation: () => {
          let validationResult

          // 第一阶段验证，验证表单
          this.$refs.table.$children[0].form.validateFieldsAndScroll(err => {
            validationResult = !err
          })

          // 第二阶段验证，验证填报项的选项字段
          const itemList = cloneDeep(this.form.getFieldValue('itemList'))

          for (let i = 0; i < itemList.length; i++) {
            if (itemList[i].modType < 3) {
              /* =======触发填报项内选项的验证（这里仅仅是触发，以突出显示红色边框）===================== */
              if (itemList[i].itemOptionList?.length < 1) {
                validationResult = false
                itemList[i].itemOptionList = [{ hasError: true }]
              }

              if (itemList[i].itemOptionList?.length === 1 && itemList[i].itemOptionList[0].optionValue === '') {
                validationResult = false
                itemList[i].itemOptionList[0].hasError = true
              }

              if (itemList[i].itemOptionList?.length > 1) {
                itemList[i].itemOptionList.forEach(itemOption => {
                  if (itemOption.optionValue === '' && itemOption.score !== '') {
                    validationResult = false
                    itemOption.hasError = true
                  }
                })
              }

              this.form.setFieldsValue({ itemList })
              /* ================================================================================ */
            }
          }

          // 返回验证结果
          return validationResult
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
          <Form.Item
            label="类型"
            class={'half'}
          >
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
          <Form.Item
            label="填报项"
            required
          >
            {
              this.form.getFieldDecorator('itemList', { initialValue: initialValue.itemList || [] })(
                <MultiInput
                  ref={'table'}
                  visible={this.visible}
                  mode={this.currentItem.id ? 'edit' : 'add'}
                  indicators={this.indicators}
                  selectedIndicatorIds={this.selectedIndicatorIds}
                  parentForm={this.form}
                  affixTarget={() => document.querySelector('.bnm-dc-templates-edit .ant-modal-body')}
                  affixOffsetTop={-44}
                  onAddItem={this.onAddItem}
                  onRowIndicatorChange={this.onRowIndicatorChange}
                  footer={() => (
                    <Select
                      ref={'searchTemplate'}
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
                  )}
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
        <ModalOfTemplateItems
          modalTitle={'引用模版'}
          onChange={this.importTemplate}
        />
      </DragModal>
    )
  }
})
