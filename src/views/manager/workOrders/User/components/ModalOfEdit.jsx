import '../assets/styles/index.scss'
import { Form, Input, InputNumber, Radio, Spin, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { mapGetters } from 'vuex'
import { verifyEmail, verifyIDNumber, verifyMobileNumber } from '@/utils/validators'
import { cloneDeep } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return {
      visibleField: 'visibleOfEdit',
      modalProps: {
        width: 810,
        wrapClassName: 'bnm-modal-workorder-user-form'
      }
    }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    organizationTree() {
      return this.getState('organizationTree', this.moduleName)
    },
    details() {
      return this.getState('details', this.moduleName)
    },
    loading() {
      return this.getState('loading', this.moduleName)
    },
    images() {
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
        ok: () => this.onSubmit({
          customDataHandler: values => {
            const temp = cloneDeep(values)

            // temp.organId = temp.organId.length > 0
            //   ? temp.organId[temp.organId.length - 1]
            //   : ''

            temp.loginName = temp.mobile

            if (temp.headPortrait.length) {
              temp.headPortrait = temp.headPortrait[0].response?.data[0].key ?? temp.headPortrait[0].key
            } else {
              temp.headPortrait = ''
            }

            return temp
          }
        })
      }
    }

    return (
      <DragModal {...attributes}>
        <Spin spinning={this.loading}>
          <Form
            class="bnm-form-grid"
            colon={false}
          >
            <Form.Item label="头像">
              {
                this.form.getFieldDecorator('headPortrait', { initialValue: this.images })(
                  <BNUploadPictures limit={1} />
                )
              }
            </Form.Item>
            <Form.Item
              label="姓名"
              class={'half'}
            >
              {
                this.form.getFieldDecorator('fullName', {
                  initialValue: this.details.fullName ?? undefined,
                  rules: [
                    {
                      required: true,
                      message: '请输入姓名!',
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
            <Form.Item
              label="性别"
              class={'half'}
            >
              {
                this.form.getFieldDecorator('gender', { initialValue: this.details.gender ?? 1 })(
                  <Radio.Group>
                    <Radio value={1}>男</Radio>
                    <Radio value={2}>女</Radio>
                  </Radio.Group>
                )
              }
            </Form.Item>
            <Form.Item
              label="手机号码"
              class={'half'}
            >
              {
                this.form.getFieldDecorator('mobile', {
                  initialValue: this.details.mobile ?? undefined,
                  rules: [
                    {
                      required: true,
                      message: '请输入手机号码!',
                      trigger: 'blur'
                    },
                    { validator: verifyMobileNumber }
                  ]
                })(
                  <Input
                    placeholder="请输入"
                    allowClear
                  />
                )
              }
            </Form.Item>
            {/*<Form.Item*/}
            {/*  label="登录账号"*/}
            {/*  class={'half'}*/}
            {/*>*/}
            {/*  {*/}
            {/*    this.form.getFieldDecorator('loginName', {*/}
            {/*      initialValue: this.details.mobile ?? undefined,*/}
            {/*      rules: [*/}
            {/*        {*/}
            {/*          required: true,*/}
            {/*          message: '请输入登录账号!',*/}
            {/*          trigger: 'blur'*/}
            {/*        }*/}
            {/*      ]*/}
            {/*    })(*/}
            {/*      <Input*/}
            {/*        placeholder="请输入"*/}
            {/*        allowClear*/}
            {/*      />*/}
            {/*    )*/}
            {/*  }*/}
            {/*</Form.Item>*/}
            <Form.Item
              label="身份证号"
              class={'half'}
            >
              {
                this.form.getFieldDecorator('idCard', {
                  initialValue: this.details.idCard || undefined,
                  rules: [
                    // {
                    //   required: true,
                    //   message: '请输入身份证号!',
                    //   trigger: 'blur'
                    // },
                    { validator: verifyIDNumber }
                  ]
                })(
                  <Input
                    placeholder="请输入"
                    allowClear
                  />
                )
              }
            </Form.Item>
            <Form.Item
              label="电子邮箱"
              class={'half'}
            >
              {
                this.form.getFieldDecorator('email', {
                  initialValue: this.details.email ?? undefined,
                  rules: [{ validator: verifyEmail }]
                })(
                  <Input
                    placeholder="请输入"
                    allowClear
                  />
                )
              }
            </Form.Item>
            <Form.Item label="简介">
              {
                this.form.getFieldDecorator('description', { initialValue: this.details.description ?? undefined })(
                  <Input.TextArea
                    placeholder="请输入"
                    allowClear
                    autoSize={{ minRows: 6 }}
                  />
                )
              }
            </Form.Item>
            {/*<Form.Item*/}
            {/*  label="所在部门"*/}
            {/*  class={'half'}*/}
            {/*>*/}
            {/*  {*/}
            {/*    this.form.getFieldDecorator('organId', {*/}
            {/*      initialValue: this.details.organParentIds ?? [],*/}
            {/*      rules: [*/}
            {/*        {*/}
            {/*          required: true,*/}
            {/*          type: 'array',*/}
            {/*          message: '请输入所在部门!',*/}
            {/*          trigger: 'change'*/}
            {/*        }*/}
            {/*      ]*/}
            {/*    })(*/}
            {/*      <Cascader*/}
            {/*        options={this.organizationTree?.list ?? []}*/}
            {/*        field-names={{*/}
            {/*          label: 'name',*/}
            {/*          value: 'id',*/}
            {/*          children: 'children'*/}
            {/*        }}*/}
            {/*        placeholder="请选择"*/}
            {/*      />*/}
            {/*    )*/}
            {/*  }*/}
            {/*</Form.Item>*/}
            {/*<Form.Item*/}
            {/*  label="工种"*/}
            {/*  class={'half'}*/}
            {/*>*/}
            {/*  {*/}
            {/*    this.form.getFieldDecorator('workType', {*/}
            {/*      initialValue: this.details.workType ?? undefined,*/}
            {/*      rules: [*/}
            {/*        {*/}
            {/*          required: true,*/}
            {/*          message: '请输入工种!',*/}
            {/*          trigger: 'blur'*/}
            {/*        }*/}
            {/*      ]*/}
            {/*    })(*/}
            {/*      <Input*/}
            {/*        placeholder="请输入"*/}
            {/*        allowClear*/}
            {/*      />*/}
            {/*    )*/}
            {/*  }*/}
            {/*</Form.Item>*/}
            <Form.Item
              label="排序"
              class={'half'}
            >
              {
                this.form.getFieldDecorator('sortIndex', {
                  initialValue: this.details.sortIndex || 0,
                  rules: [
                    {
                      required: true,
                      type: 'number',
                      message: '请输入排序!',
                      trigger: 'blur'
                    }
                  ]
                })(
                  <InputNumber
                    placeholder="请输入排序"
                    allowClear
                    style={{ width: '100%' }}
                  />
                )
              }
            </Form.Item>
            <Form.Item
              label="状态"
              class={'half'}
            >
              {
                this.form.getFieldDecorator('status', {
                  initialValue: this.details.status === undefined ? true : this.details.status === 1,
                  valuePropName: 'checked',
                  rules: [
                    {
                      required: true,
                      type: 'boolean',
                      message: '请选择状态!',
                      trigger: 'change'
                    }
                  ]
                })(
                  <Switch />
                )
              }
            </Form.Item>
          </Form>
        </Spin>
      </DragModal>
    )
  }
})
