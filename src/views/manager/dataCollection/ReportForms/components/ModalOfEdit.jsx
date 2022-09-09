import '../assets/styles/index.scss'
import { Button, Checkbox, DatePicker, Form, Input, message, Select, Spin } from 'ant-design-vue'
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
        // footer: [
        //   <Button onClick={() => this.onCancel()}>取消</Button>,
        //   // <Button onClick={() => this.onCancel(this.visibleField)}>预览</Button>,
        //   <Button type={'primary'} onClick={() => this.onSubmit()}>保存</Button>
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
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await Promise.all([
            this.handleDetails(),
            this.onSearchIndicators(undefined)
          ])
        }
      }
    }
  },
  methods: {
    async onSearchIndicators(keyword) {
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
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({
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
                  value: temp, errors: [new Error('请补全填报内容！')]
                }
              })
              validationResult = false
            }

            return validationResult
          }
        })
      }
    }

    return (
      <DragModal class={'bnm-report-forms-edit'} {...attributes}>
        <Form class="bnm-form-grid">
          <Form.Item label="报表名称" class={'one-third'}>
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true, message: '请输入模版名称!', trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder="请输入模版名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="填报时间" class={'one-third'}>
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
                    required: true, type: 'array', message: '请输入填报时间!', trigger: 'change'
                  }
                ]
              })(
                <DatePicker.RangePicker style={{ width: '100%' }} allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="填报周期" class={'one-third'}>
            {
              this.form.getFieldDecorator('fillPeriod', {
                initialValue: this.details.fillPeriod,
                rules: [
                  {
                    required: true, type: 'number', message: '请选择填报周期!', trigger: 'change'
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
                    required: true, type: 'array', message: '请选择填报园区!', trigger: 'change'
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
                    required: true, type: 'array', message: '请选择填报对象!', trigger: 'change'
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
                initialValue: this.details.itemList || [],
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请补全填报内容!',
                    trigger: 'change'
                  }
                ]
              })(
                <MultiInput
                  visible={this.visible}
                  mode={this.currentItem.id ? 'edit' : 'add'}
                  indicators={this.indicators}
                  onSearch={this.onSearchIndicators}
                  templateType={1}
                  parentForm={this.form}
                  affixTarget={() => document.querySelector('.bnm-report-forms-edit .ant-modal-body')}
                  affixOffsetTop={-142}
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
        <ModalOfTemplateItems modalTitle={'引用模版'} onChange={this.importTemplate} />
      </DragModal>
    )
  }
})
