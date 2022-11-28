import '../assets/styles/index.scss'
import { Form, Input, Switch, Select, Checkbox, message, InputNumber } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { mapGetters } from 'vuex'


export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      modalProps: {
        width: 600,
        wrapClassName: 'bnm-modal-edit-user-form'
      },
      formItem: false,
      formItemTow: false
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    kpiAndParam() {
      return this.getState('KpiAndParam', this.moduleName)
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
        }
      }
    }
  },
  methods: {
    onChangeKpi(e) {
      this.form.setFieldsValue({ monitorParamId: '' })
      this.kpiItem = this.kpiAndParam.kpi.filter(item => {
        if (item.id === e) {
          return item
        }
      })
      this.paramList(e)

    },
    paramList(e) {
      const arr = []

      this.kpiAndParam.param.map(item => {
        if (item.kpiId === e) {
          arr.push(item)
        }
      })
      this.param = arr ?? []
    },
    onChangeParam(e) {
      this.paramItem = this.kpiAndParam.param.filter(item => {
        if (item.id === e) {
          return item
        }
      })
    },
    // 历史差异值
    differenceValue(e) {
      this.formItem = e.target.checked

      if (!this.formItem) {
        this.form.setFieldsValue({ historyDifferenceType: 1 })
        this.form.setFieldsValue({ historyDifferenceValue: '' })
      }
    },
    // 绝对值比较
    absoluteValue(e) {
      this.formItemTow = e.target.checked

      if (!this.formItemTow) {
        this.form.setFieldsValue({ absoluteDifferenceType: 1 })
        this.form.setFieldsValue({ absoluteDifferenceValue: '' })
      }
    },
    customDataHandler(values) {
      const data = { ...values }

      if (!this.formItem) {
        data.historyDifferenceType = 0
      }

      if (!this.formItemTow) {
        data.absoluteDifferenceType = 0
      }

      data.monitorParamName = this.currentItem?.monitorParamName ?? this.paramItem?.[0]?.paramName ?? ''
      data.monitorItemKpiName = this.currentItem?.monitorItemKpiName ?? this.kpiItem?.[0]?.kpiName ?? ''
      data.monitorItemId = this.currentItem?.monitorItemId ?? this.kpiItem?.[0]?.itemId ?? ''
      data.isHistoryDifference = this.currentItem?.isHistoryDifference ?? this.formItem ? 1 : 0
      data.isAbsoluteDifference = this.currentItem?.isAbsoluteDifference ?? this.formItemTow ? 1 : 0

      return data
    }
  },

  watch: {
    currentItem: {
      deep: false,
      handler(value) {
        if (value && value.historyDifferenceValue) {
          this.formItem = true
        }

        if (value && value.absoluteDifferenceValue) {
          this.formItemTow = true
        }

        if (value && value.monitorItemKpiId) {
          this.paramList(this.currentItem.monitorItemKpiId)
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 19 }}
          colon={false}
        >

          <Form.Item label="名称">
            {
              this.form.getFieldDecorator('monitorName', {
                initialValue: this.currentItem.monitorName
              })(
                <Input
                  placeholder="请输入"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="监测参数" style="margin-bottom:0;">
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 6px)', marginRight: '12px' }}>
              {
                this.form.getFieldDecorator('monitorItemKpiId', {
                  initialValue: this.currentItem.monitorItemKpiId
                })(
                  <Select placeholder="指标" onchange={this.onChangeKpi}>
                    {
                      this.kpiAndParam.kpi?.map(item => (
                        <Select.Option value={item.id}>{item.kpiName}</Select.Option>
                      ))
                    }
                  </Select>
                )
              }
            </Form.Item>
            <Form.Item
              style={{ display: 'inline-block', width: 'calc(50% - 6px)' }}>
              {
                this.form.getFieldDecorator('monitorParamId', {
                  initialValue: this.currentItem.monitorParamId
                })(
                  <Select placeholder="参数" onchange={this.onChangeParam}>
                    {
                      this.param?.map(item => (
                        <Select.Option value={item.id}>{item.paramName}</Select.Option>
                      ))
                    }
                  </Select>
                )
              }
            </Form.Item>
          </Form.Item>

          <Form.Item label="条件与阈值" style="margin-bottom:0;">
            <div class='level-display'>
              <Checkbox checked={this.formItem} onchange={this.differenceValue}>历史数据差异</Checkbox>
              <div style={{ display: this.formItem ? 'block' : 'none' }}>
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(50% - 6px)', marginRight: '12px' }}>
                  {
                    this.form.getFieldDecorator('historyDifferenceType', {
                      initialValue: this.currentItem.historyDifferenceType ?? 1
                    })(
                      <Select>
                        <Select.Option value={1} defaultValue={1}>高于（百分比）</Select.Option>
                        <Select.Option value={2}>低于（百分比）</Select.Option>
                      </Select>
                    )
                  }
                </Form.Item>
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(50% - 6px)' }}>
                  {
                    this.form.getFieldDecorator('historyDifferenceValue', {
                      initialValue: this.currentItem.historyDifferenceValue ?? 0,
                      rules: [
                        {
                          required: this.formItem,
                          type: 'number',
                          message: '请输入0-99的整数!',
                          trigger: 'blur'
                        }
                      ]
                    })(
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="0-99的整数"
                        min={0}
                        max={99}
                        allowClear
                      />
                    )
                  }
                </Form.Item>
              </div>
            </div>
            <div class='level-display'>
              <Checkbox checked={this.formItemTow} onchange={this.absoluteValue}>绝对值比较</Checkbox>
              <div style={{ display: this.formItemTow ? 'block' : 'none' }}>
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(50% - 6px)', marginRight: '12px' }}>
                  {
                    this.form.getFieldDecorator('absoluteDifferenceType', {
                      initialValue: this.currentItem.absoluteDifferenceType ?? 1
                    })(
                      <Select>
                        <Select.Option value={1} defaultValue={1}>高于（数值）</Select.Option>
                        <Select.Option value={2}>低于（数值）</Select.Option>
                      </Select>
                    )
                  }
                </Form.Item>
                <Form.Item
                  style={{ display: 'inline-block', width: 'calc(50% - 6px)' }}>
                  {
                    this.form.getFieldDecorator('absoluteDifferenceValue', {
                      initialValue: this.currentItem.absoluteDifferenceValue,
                      rules: [
                        {
                          required: this.formItemTow,
                          type: 'number',
                          message: '请输入数值!',
                          trigger: 'blur'
                        }
                      ]
                    })(
                      <InputNumber
                        style={{ width: '100%' }}
                        placeholder="请输入数值"
                        allowClear
                      />
                    )
                  }
                </Form.Item>
              </div>
            </div>
            <p class='tips'>* 体检结果同时满足已勾选条件时，系统将提示数据异常！</p>
          </Form.Item>
          <Form.Item label="备注">
            {
              this.form.getFieldDecorator('remark', {
                initialValue: this.currentItem.remark
              })(
                <Input
                  placeholder="请输入"
                  allowClear
                />
              )
            }
          </Form.Item>

          <Form.Item label="排序">
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || 0,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入排序!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="状态">
            {
              this.form.getFieldDecorator('status', {
                initialValue: this.currentItem.status === 1,
                valuePropName: 'checked'
              })(
                <Switch />
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
