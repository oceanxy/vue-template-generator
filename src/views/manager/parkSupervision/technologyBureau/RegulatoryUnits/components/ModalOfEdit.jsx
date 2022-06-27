import '../assets/styles/index.scss'
import { Cascader, Col, Form, Input, Row, Select, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import { mapGetters } from 'vuex'
import DragModal from '@/components/DragModal'
import { debounce } from 'lodash'
import { dispatch } from '@/utils/store'

export default Form.create({})({
  mixins: [forFormModal()],
  props: {
    /**
     * 标题（可定义占位符）
     * “{action}” 为占位符，稍后会在 mixin 中替换为对应的字符，比如“新增”、“编辑”
     */
    title: {
      type: String,
      default: '{action}'
    }
  },
  data() {
    return {
      modalProps: {
        width: 810
      }
    }
  },
  computed: {
    ...mapGetters({
      administrativeDivision: 'administrativeDivision',
      defaultAdministrativeDivision: 'defaultAdministrativeDivision',
      parksForSelect: 'parksForSelect'
    })
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          if (!this.administrativeDivision.length) {
            await dispatch('common', 'getAdministrativeDivision')
          }

          if (!this.parksForSelect.length) {
            await dispatch('common', 'getParksForSelect')
          }
        }
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit
      }
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          colon={false}
        >
          <Form.Item label="所属园区" class={'half'}>
            {
              this.form.getFieldDecorator('parkName', {
                initialValue: this.currentItem.parkName || undefined
              })(
                <Select allowClear placeholder="请选择监管单位">
                  {
                    this.parksForSelect.map(item => (
                      <Select.Option value={item.id}>{item.fullName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="单位名称" class={'half'}>
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [{ required: true, message: '请输入单位名称!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入单位名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="账号" class={'half'}>
            {
              this.form.getFieldDecorator('loginAccount', {
                initialValue: this.currentItem.loginAccount,
                rules: [{ required: true, message: '请输入登录账号!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入登录账号" allowClear disabled={!!this.currentItem.id} />
              )
            }
          </Form.Item>
          {
            this.currentItem?.id ? null : (
              <Form.Item label="登录密码" class={'half'}>
                {
                  this.form.getFieldDecorator('loginPwd', {
                    initialValue: this.currentItem.loginPwd,
                    rules: [{ required: true, message: '请输入登录密码!', trigger: 'blur' }]
                  })(
                    <Input placeholder="请输入登录密码" allowClear />
                  )
                }
              </Form.Item>
            )
          }
          <Form.Item label="负责人" class={'half'}>
            {
              this.form.getFieldDecorator('employeeName', {
                initialValue: this.currentItem.employeeName
              })(
                <Input placeholder="请输入负责人姓名" />
              )
            }
          </Form.Item>
          <Form.Item label="负责人手机号" class={'half'}>
            {
              this.form.getFieldDecorator('employeeMobile', {
                initialValue: this.currentItem.employeeMobile
              })(
                <Input placeholder="请输入负责人手机号码" />
              )
            }
          </Form.Item>
          <Form.Item label="联系电话" class={'half'}>
            {
              this.form.getFieldDecorator('chargePhone', {
                initialValue: this.currentItem.chargePhone
              })(
                <Input placeholder="请输入联系电话" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="地址" class={'custom'} required>
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('areaCode', {
                      initialValue: this.defaultAdministrativeDivision,
                      rules: [{ required: true, type: 'array', message: '请选择行政区划!', trigger: 'blur' }]
                    })(
                      <Cascader
                        placeholder="请选择省市区"
                        expandTrigger={'hover'}
                        allowClear
                        options={this.administrativeDivision}
                        fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                      />
                    )
                  }
                </Form.Item>
              </Col>
              <Col span={14}>
                <Form.Item>
                  {
                    this.form.getFieldDecorator('address', {
                      initialValue: this.currentItem.address,
                      rules: [{ required: true, message: '请输入详细地址!', trigger: 'blur' }]
                    })(
                      <Input placeholder="请输入详细地址" allowClear />
                    )
                  }
                </Form.Item>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item label="简介">
            {
              this.form.getFieldDecorator('description', {
                initialValue: this.currentItem.description
              })(
                <Input placeholder="请输入简介" type={'textarea'} />
              )
            }
          </Form.Item>
          <Form.Item label="排序" class={'half'}>
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || 0,
                rules: [{ required: true, type: 'number', message: '请输入排序值!', trigger: 'blur' }]
              })(
                <Input placeholder="请输入排序值" />
              )
            }
          </Form.Item>
          <Form.Item label="状态" class={'half'}>
            {
              this.form.getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: this.currentItem.status === 1,
                rules: [{ required: true, type: 'boolean', message: '请选择状态!', trigger: 'blur' }]
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
