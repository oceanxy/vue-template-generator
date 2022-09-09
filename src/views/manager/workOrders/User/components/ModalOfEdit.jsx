import '../assets/styles/index.scss'
import { Cascader, Col, Form, Input, InputNumber, Radio, Row, Spin, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfEdit',
      modalProps: {
        width: 700,
        wrapClassName: 'bnm-modal-workorder-user-form'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    organizationTree() {
      return this.getState('organizationTree', this.moduleName) || []
    },
    details() {
      return this.getState('details', this.moduleName)
    },
    loading() {
      return this.getState('loading', this.moduleName)
    }
  },
  async created() {
    await this.$store.dispatch('common/getOrganizationTree')
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.getDetail()
        } else {
          this.$store.commit('setDetails', {
            moduleName: this.moduleName,
            value: {}
          })
        }
      }
    }
  },
  methods: {
    customDataHandler(values) {
      const data = { ...values }

      data.organId = data.organId.length > 0 ? data.organId[data.organId.length - 1] : ''
      data.loginName = data.mobile

      return data
    },
    async getDetail() {
      if (!this.currentItem.id) return

      await this.$store.dispatch('getDetails', {
        moduleName: this.moduleName,
        payload: { id: this.currentItem.id }
      })
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit({ customDataHandler: this.customDataHandler })
      }
    }
    const getImgs = () => {
      if (this.details.headPortrait) {
        return [
          {
            uid: 0,
            url: this.details.headPortraitStr,
            key: this.details.headPortrait,
            name: this.details.headPortraitStr?.substring(this.details.headPortraitStr?.lastIndexOf('/')),
            status: 'done'
          }
        ]
      } else {
        return []
      }
    }

    return (
      <DragModal {...attributes}>
        <Spin spinning={this.loading}>
          <Form class="" colon={false}>
            <Row gutter={10}>
              <Col span={24}>
                <Form.Item label="头像">
                  {this.form.getFieldDecorator('headPortrait', { initialValue: getImgs() })(
                    <BNUploadPictures limit={1} />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="姓名">
                  {this.form.getFieldDecorator('fullName', {
                    initialValue: this.details.fullName ?? undefined,
                    rules: [
                      {
                        required: true,
                        message: '请输入姓名!',
                        trigger: 'blur'
                      }
                    ]
                  })(<Input placeholder="请输入" allowClear />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="性别">
                  {this.form.getFieldDecorator('gender', { initialValue: this.details.gender ?? 1 })(
                    <Radio.Group>
                      <Radio value={1}>男</Radio>
                      <Radio value={2}>女</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="手机号码">
                  {this.form.getFieldDecorator('mobile', {
                    initialValue: this.details.mobile ?? undefined,
                    rules: [
                      {
                        required: true,
                        message: '请输入手机号码!',
                        trigger: 'blur'
                      }
                    ]
                  })(<Input placeholder="请输入" allowClear />)}
                </Form.Item>
              </Col>
              {/* <Col span={12}>
                <Form.Item label="登录账号">
                  {this.form.getFieldDecorator('loginName', {
                    initialValue: this.details.mobile ?? undefined,
                    rules: [
                      {
                        required: true,
                        message: '请输入登录账号!',
                        trigger: 'blur'
                      }
                    ]
                  })(<Input placeholder="请输入" allowClear />)}
                </Form.Item>
              </Col> */}
              <Col span={12}>
                <Form.Item label="身份证号">
                  {this.form.getFieldDecorator('idCard', {
                    initialValue: this.details.idCard ?? undefined,
                    rules: [
                      {
                        required: true,
                        message: '请输入身份证号!',
                        trigger: 'blur'
                      }
                    ]
                  })(<Input placeholder="请输入" allowClear />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="电子邮箱">
                  {this.form.getFieldDecorator('email', { initialValue: this.details.email ?? undefined })(
                    <Input placeholder="请输入" allowClear />
                  )}
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="简介">
                  {this.form.getFieldDecorator('description', { initialValue: this.details.description ?? undefined })(
                    <Input placeholder="请输入" allowClear />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="所在部门">
                  {this.form.getFieldDecorator('organId', {
                    initialValue: this.details.organParentIds ?? [],
                    rules: [
                      {
                        required: true,
                        type: 'array',
                        message: '请输入所在部门!',
                        trigger: 'change'
                      }
                    ]
                  })(
                    <Cascader
                      options={this.organizationTree}
                      field-names={{
                        label: 'name',
                        value: 'id',
                        children: 'children'
                      }}
                      placeholder="请选择"
                    />
                  )}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="工种">
                  {this.form.getFieldDecorator('workType', {
                    initialValue: this.details.workType ?? undefined,
                    rules: [
                      {
                        required: true,
                        message: '请输入工种!',
                        trigger: 'blur'
                      }
                    ]
                  })(<Input placeholder="请输入" allowClear />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="排序">
                  {this.form.getFieldDecorator('sortIndex', {
                    initialValue: this.details.sortIndex || 0,
                    rules: [
                      {
                        required: true,
                        type: 'number',
                        message: '请输入排序!',
                        trigger: 'blur'
                      }
                    ]
                  })(<InputNumber placeholder="请输入排序" allowClear style={{ width: '100%' }} />)}
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="状态">
                  {this.form.getFieldDecorator('status', {
                    initialValue: this.details.status === undefined ? true : this.details.status === 1,
                    valuePropName: 'checked'
                  })(<Switch />)}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Spin>
      </DragModal>
    )
  }
})
