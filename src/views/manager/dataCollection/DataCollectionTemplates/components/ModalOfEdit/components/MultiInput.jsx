import '../index.scss'
import { cloneDeep, debounce } from 'lodash'
import ItemMultiInput from './ItemMultiInput'
import { Affix, Button, Form, Input, Modal, Select, Space, Spin, Switch, Table } from 'ant-design-vue'

export default Form.create({})({
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    mode: {
      type: String,
      default: 'add'
    },
    value: {
      type: Array,
      default: () => []
    },
    indicators: {
      type: Object,
      default: () => ({})
    },
    selectedIndicatorIds: {
      type: Array,
      default: () => []
    },
    parentForm: {
      type: Object,
      required: true
    },
    affixOffsetTop: {
      type: Number,
      required: true
    },
    affixTarget: {
      type: Function,
      required: true
    },
    footer: {
      type: Function,
      default: () => null
    }
  },
  data() {
    const columns = [
      {
        title: '序号',
        width: 60,
        align: 'center',
        dataIndex: 'serialNum'
      },
      {
        title: '指标',
        width: 140,
        scopedSlots: { customRender: 'targetId' }
      },
      {
        title: <div class="ant-form-item-required">标题</div>,
        width: 140,
        scopedSlots: { customRender: 'fullName' }
      },
      {
        title: '描述',
        width: 140,
        scopedSlots: { customRender: 'description' }
      },
      {
        title: <div class="ant-form-item-required">组件类型</div>,
        width: 100,
        scopedSlots: { customRender: 'modType' }
      },
      {
        title: <div class="ant-form-item-required">选项（单选或多选时必填）</div>,
        width: 300,
        scopedSlots: { customRender: 'itemOptionList' }
      },
      {
        title: '是否必填',
        align: 'center',
        width: 100,
        scopedSlots: { customRender: 'isRequired' }
      },
      {
        title: '启用状态',
        align: 'center',
        width: 100,
        scopedSlots: { customRender: 'status' }
      },
      {
        title: (
          <Affix
            ref={'affix'}
            offsetTop={this.affixOffsetTop}
            target={this.affixTarget}
          >
            <Button
              icon={'plus'}
              type="primary"
              ghost
              onClick={this.onCreateRow}
            >
              添加填报项
            </Button>
          </Affix>
        ),
        width: 180,
        align: 'center',
        scopedSlots: { customRender: 'operation' }
      }
    ]

    return {
      columns,
      dataSource: [],
      loading: false,
      prevIndicatorId: undefined // 用于保存填报项内指标字段变动前的值
    }
  },
  watch: {
    value: {
      immediate: true,
      handler(value) {
        if (value.length) {
          this.dataSource = value.map(item => {
            item.id = item.id || Math.random()
            item.disabled = !!item.targetId
            item.targetId = item.targetId || ''
            item.isRequired = !!item.isRequired
            item.status = !!item.status

            return item
          })
        } else {
          this.dataSource = []
          this.onCreateRow()
        }

        this.loading = false
      }
    },
    visible: {
      immediate: true,
      handler(value) {
        if (value && this.mode === 'edit') {
          this.loading = true
        }
      }
    }
  },
  mounted() {
    // 根据官方文档，解决Affix固钉移到target容器外的问题
    this.$refs.affix.updatePosition()
  },
  methods: {
    onDelClick(id) {
      const dataSource = cloneDeep(this.dataSource)
      const index = dataSource.findIndex(item => item.id === id)

      // 执行删除
      dataSource.splice(index, 1)
      // 整理序号
      dataSource.forEach((item, index) => {
        item.serialNum = index + 1
      })

      this.dataSource = dataSource
      this.$emit('change', dataSource)
    },
    /**
     * 增加一行填报项
     * @param [isTriggeredManually] {boolean} 是否是手动触发
     */
    onCreateRow(isTriggeredManually) {
      const row = {
        id: Math.random(),
        disabled: false,
        serialNum: this.dataSource.length + 1,
        targetId: '',
        fullName: '',
        itemOptionList: [],
        description: '',
        modType: 1,
        isRequired: true,
        status: true
      }

      this.dataSource.push(row)

      if (isTriggeredManually) {
        this.$emit('addItem')
      }
    },
    onChange(field) {
      // 加 $nextTick 是保证 ItemMultiInput 等子组件的 value 即时回传。（否则可能导致此处取不到子组件最新值的问题）
      this.$nextTick(() => {
        this.loading = true

        if (field) {
          const [key, index] = field.split('-')

          this.dataSource[index][key] = this.form.getFieldValue(field)
        }

        this.$emit('change', this.dataSource)
        this.loading = false
      })
    },
    onMoveUp(id) {
      this.loading = true

      const index = this.dataSource.findIndex(item => item.id === id)
      const target = this.dataSource.filter((item, i) => {
        if (index === i) {
          item.serialNum = +item.serialNum - 1
        }

        if (index - 1 === i) {
          item.serialNum = +item.serialNum + 1
        }

        return index === i || index - 1 === i
      })

      this.dataSource.splice(index - 1, 2, ...([target[0], target[1]] = [target[1], target[0]]))
      this.loading = false
    },
    onMoveDown(id) {
      this.loading = true

      const index = this.dataSource.findIndex(item => item.id === id)
      const target = this.dataSource.filter((item, i) => {
        if (index === i) {
          item.serialNum = +item.serialNum + 1
        }

        if (index + 1 === i) {
          item.serialNum = +item.serialNum - 1
        }

        return index === i || index + 1 === i
      })

      this.dataSource.splice(index, 2, ...([target[0], target[1]] = [target[1], target[0]]))
      this.loading = false
    },
    resetRow(value, record) {
      const index = this.dataSource.findIndex(item => item.id === record.id)
      const temp = this.indicators.list.find(item => item.id === value)
      const oldItem = this.dataSource[index]

      this.dataSource.splice(index, 1, {
        id: oldItem.id,
        serialNum: oldItem.serialNum,
        targetId: temp.id,
        fullName: temp.fullName,
        itemOptionList: temp.targetOptionList,
        description: temp.description,
        modType: temp.modType,
        isRequired: true,
        status: true,
        disabled: true
      })

      // 加上次判断，避免有时无法给需要验证的表单项赋值的问题
      if (this.form.getFieldValue(`fullName-${index}`) !== temp.fullName) {
        this.form.setFieldsValue({
          [`fullName-${index}`]: temp.fullName,
          [`modType-${index}`]: temp.modType,
          [`itemOptionList-${index}`]: temp.targetOptionList
        })
      }

      this.loading = false
    },
    async onIndicatorChange(value, record) {
      this.loading = true
      // 取消父级表单的验证信息，如果有
      this.parentForm.setFields({
        itemList: {
          value: this.dataSource,
          error: []
        }
      })

      if (value !== '') {
        if (
          record.fullName ||
          record.description ||
          (
            Array.isArray(record.itemOptionList)
              ? record.itemOptionList
              : []
          ).filter(item => item.optionValue || item.score).length
        ) {
          Modal.confirm({
            title: '请确认',
            content: '当前行存在已输入的数据，若要使用指标数据来覆盖已存在的数据，请单击“覆盖”按钮，否则请单击“取消”按钮。',
            okText: '覆盖',
            cancelText: '取消',
            onOk: async close => {
              this.resetRow(value, record)

              close()
            },
            onCancel: () => {
              record.targetId = this.prevIndicatorId

              if (this.prevIndicatorId) {
                this.prevIndicatorId = undefined // 下拉列表展开时保存的指标ID已无意义，现重置为初始值
              } else {
                record.disabled = false
              }

              this.loading = false
            }
          })
        } else {
          this.resetRow(value, record)
        }
      } else {
        record.targetId = ''
        record.disabled = false
        this.loading = false
      }

      this.$emit('rowIndicatorChange')
    },
    onIndicatorDropdownVisibleChange(open, record) {
      if (open) {
        this.prevIndicatorId = record.targetId
      }
    }
  },
  render() {
    return (
      <Form class="tg-multi-input bnm-report-items">
        <Table
          class="multi-input-table"
          tableLayout={'fixed'}
          columns={this.columns}
          dataSource={this.dataSource}
          pagination={false}
          rowKey="id"
          size={'small'}
          loading={this.loading}
          footer={this.footer}
          {...{
            scopedSlots: {
              targetId: (text, record) => (
                <Select
                  vModel={record.targetId}
                  title={'输入指标名称搜索'}
                  placeholder={'输入指标名称搜索'}
                  showSearch
                  notFoundContent={this.indicators.loading ? <Spin /> : undefined}
                  onChange={value => this.onIndicatorChange(value, record)}
                  onDropdownVisibleChange={open => this.onIndicatorDropdownVisibleChange(open, record)}
                  dropdownStyle={{ minWidth: '240px' }}
                  optionFilterProp={'children'}
                >
                  <Select.OptGroup label={'自定义'}>
                    <Select.Option value={''}>手动输入</Select.Option>
                  </Select.OptGroup>
                  <Select.OptGroup label={'从指标导入'}>
                    {
                      this.indicators.list.map(item => (
                        <Select.Option
                          value={item.id}
                          label={item.fullName}
                          title={item.fullName}
                          disabled={this.selectedIndicatorIds.includes(item.id)}
                        >
                          {item.fullName}
                        </Select.Option>
                      ))
                    }
                  </Select.OptGroup>
                </Select>
              ),
              fullName: (text, record, index) => (
                <Form.Item>
                  {
                    this.form.getFieldDecorator(`fullName-${index}`, {
                      initialValue: record.fullName,
                      rules: [
                        {
                          required: true,
                          message: '请填写问卷标题',
                          trigger: 'blur'
                        }
                      ]
                    })(
                      <Input.TextArea
                        placeholder="问卷标题"
                        autoSize={{ minRows: 6 }}
                        onBlur={() => this.onChange(`fullName-${index}`)}
                        disabled={record.disabled}
                      />
                    )
                  }
                </Form.Item>
              ),
              modType: (text, record, index) => (
                <Form.Item>
                  {
                    this.form.getFieldDecorator(`modType-${index}`, { initialValue: record.modType })(
                      <Select
                        placeholder={'组件类型'}
                        onChange={debounce(() => this.onChange(`modType-${index}`), 300)}
                        disabled={record.disabled}
                      >
                        <Select.Option value={1}>单选</Select.Option>
                        <Select.Option value={2}>多选</Select.Option>
                        <Select.Option value={3}>单行文本</Select.Option>
                        <Select.Option value={4}>多行文本</Select.Option>
                        <Select.Option value={5}>图片</Select.Option>
                        <Select.Option value={6}>文件</Select.Option>
                        <Select.Option value={7}>时间</Select.Option>
                      </Select>
                    )
                  }
                </Form.Item>
              ),
              itemOptionList: (text, record, index) => (
                <Form.Item>
                  {
                    this.form.getFieldDecorator(
                      `itemOptionList-${index}`,
                      { initialValue: record.itemOptionList || [] }
                    )(
                      <ItemMultiInput
                        onChange={value => this.onChange(`itemOptionList-${index}`, value)}
                        disabled={record.disabled ||
                          (
                            this.form.getFieldValue(`modType-${index}`) !== 1 &&
                            this.form.getFieldValue(`modType-${index}`) !== 2
                          )
                        }
                      />
                    )
                  }
                </Form.Item>
              ),
              description: record => (
                <Input.TextArea
                  vModel={record.description}
                  placeholder={'描述内容'}
                  autoSize={{ minRows: 6 }}
                  onBlur={() => this.onChange()}
                  disabled={record.disabled}
                />
              ),
              isRequired: record => (
                <Switch
                  vModel={record.isRequired}
                  onChange={() => this.onChange()}
                  // disabled={record.disabled}
                />
              ),
              status: record => (
                <Switch
                  vModel={record.status}
                  onChange={() => this.onChange()}
                  // disabled={record.disabled}
                />
              ),
              operation: (text, record, index) => (
                <Space>
                  <Button
                    icon="minus"
                    title={'移除'}
                    onClick={() => this.onDelClick(record.id)}
                  />
                  <Button
                    icon="up"
                    title={'上移'}
                    disabled={index <= 0}
                    onClick={() => this.onMoveUp(record.id)}
                  />
                  <Button
                    icon="down"
                    title={'下移'}
                    disabled={index >= this.dataSource.length - 1}
                    onClick={() => this.onMoveDown(record.id)}
                  />
                </Space>
              )
            }
          }}
        />
      </Form>
    )
  }
})
