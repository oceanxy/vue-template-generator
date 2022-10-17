import '../assets/styles/index.scss'
import { Checkbox, DatePicker, Form, Input, message, Select, Spin } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import MultiInput from '../../DataCollectionTemplates/components/ModalOfEdit/components/MultiInput'
import { mapGetters } from 'vuex'
import { cloneDeep, debounce } from 'lodash'
import moment from 'moment'
import ModalOfTemplateItems from './ModalOfTemplateItems'

export default Form.create({})({
  mixins: [forFormModal()],
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
    parkList() {
      return this.getState('parkList', 'login')
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
          await Promise.all([
            this.handleDetails(),
            this.getIndicators()
          ])
        } else {
          this.$refs.table?.$children[0].form.resetFields()
        }
      }
    }
  },
  methods: {
    async getIndicators() {
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
          customApiName: 'getItemsOfDataCollectionTemplate',
          payload: { fullName: keyword }
        })
      }
    },
    async handleDetails() {
      if (this.currentItem.id) {
        await this.$store.dispatch('getDetails', {
          moduleName: this.moduleName,
          payload: { id: this.currentItem.id }
        })
      } else {
        this.$store.commit('setDetails', {
          value: {},
          moduleName: this.moduleName
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
          additionalIndicator.push({ fullName: `${item.fullName}（从${item.objName}导入）`, id: item.targetId })
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

              if (itemList[i].itemOptionList?.length === 1 && (
                itemList[i].itemOptionList[0].optionValue === '' ||
                itemList[i].itemOptionList[0].optionValue === undefined
              )) {
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

    return (
      <DragModal class={'bnm-report-forms-edit'} {...attributes}>
        <Form class="bnm-form-grid">
          <Form.Item
            label="报表名称"
            class={'one-third'}
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
            label="填报时间"
            class={'one-third'}
          >
            {
              this.form.getFieldDecorator('dateRange', {
                initialValue: this.details.startTime
                  ? [
                    moment(this.details.startTime, 'YYYYMMDD'),
                    moment(this.details.endTime, 'YYYYMMDD')
                  ]
                  : [],
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请输入填报时间!',
                    trigger: 'change'
                  }
                ]
              })(
                <DatePicker.RangePicker
                  style={{ width: '100%' }}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item
            label="填报周期"
            class={'one-third'}
          >
            {
              this.form.getFieldDecorator('fillPeriod', {
                initialValue: this.details.fillPeriod,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请选择填报周期!',
                    trigger: 'change'
                  }
                ]
              })(
                <Select placeholder={'请选择填报周期'}>
                  <Select.Option value={1}>按周填报</Select.Option>
                  <Select.Option value={2}>按月填报</Select.Option>
                  <Select.Option value={3}>按季填报</Select.Option>
                  <Select.Option value={4}>按半年填报</Select.Option>
                  <Select.Option value={5}>按年填报</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="填报园区">
            {
              this.form.getFieldDecorator('parkIdList', {
                initialValue: this.details.parkIdList,
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请选择填报园区!',
                    trigger: 'change'
                  }
                ]
              })(
                <Checkbox.Group>
                  {
                    this.parkList?.map(item => (
                      <Checkbox value={item.id}>{item.fullName}</Checkbox>
                    ))
                  }
                </Checkbox.Group>
              )
            }
          </Form.Item>
          <Form.Item label="填报对象">
            {
              this.form.getFieldDecorator('fillObjList', {
                initialValue: this.details.fillObjList,
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请选择填报对象!',
                    trigger: 'change'
                  }
                ]
              })(
                <Checkbox.Group>
                  <Checkbox value={1}>监管单位</Checkbox>
                  <Checkbox value={2}>运营单位</Checkbox>
                  <Checkbox value={3}>物业单位</Checkbox>
                  <Checkbox value={4}>企业</Checkbox>
                  <Checkbox value={5}>团队</Checkbox>
                </Checkbox.Group>
              )
            }
          </Form.Item>
          <Form.Item
            label="填报项"
            required
          >
            {
              this.form.getFieldDecorator('itemList', { initialValue: this.details.itemList || [] })(
                <MultiInput
                  ref={'table'}
                  visible={this.visible}
                  mode={this.currentItem.id ? 'edit' : 'add'}
                  indicators={this.indicators}
                  selectedIndicatorIds={this.selectedIndicatorIds}
                  templateType={1}
                  parentForm={this.form}
                  affixTarget={() => document.querySelector('.bnm-report-forms-edit .ant-modal-body')}
                  affixOffsetTop={-44}
                  onAddItem={this.onAddItem}
                  onRowIndicatorChange={this.onRowIndicatorChange}
                  footer={() => (
                    <Select
                      ref={'searchTemplate'}
                      vModel={this.templateIdSelected}
                      placeholder={'搜索模版，从模版导入填报项'}
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
