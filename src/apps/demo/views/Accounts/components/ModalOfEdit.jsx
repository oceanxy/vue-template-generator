import '../assets/styles/index.scss'
import { Form, Input, Select } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { verifyEmail } from '@/utils/validators'

export default Form.create({})({
  mixins: [
    forFormModal({
      fetchDetailsFn() {
        return {
          express: !!this.currentItem.id,
          params: { id: this.currentItem.id }
        }
      }
    })
  ],
  data() {
    return { modalProps: { width: 800, destroyOnClose: true } }
  },
  computed: {
    stores() {
      return this.$store.state[this.moduleName].stores || []
    },
    roles() {
      return this.$store.state[this.moduleName].roles || []
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () =>
            this.onSubmit()
        }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await Promise.all([this.getStores(), this.getRoles()])
        }
      }
    }
  },
  methods: {
    async getStores() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        customApiName: 'getStoresForAccount',
        stateName: 'stores'
      })
    },
    async getRoles() {
      await this.$store.dispatch('getListWithLoadingStatus', {
        moduleName: this.moduleName,
        customApiName: 'getRolesForAccount',
        stateName: 'roles'
      })
    },
    filterOption(inputValue, option) {
      return option.componentOptions.children[0].text.includes(inputValue)
    }
  },
  render() {
    return (
      <DragModal {...this.attributes} class={'cmp-modal-form-accounts'}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="账号" class={'half'}>
            {
              this.form.getFieldDecorator('username', {
                initialValue: this.currentItem.username,
                rules: [
                  { required: true, message: '请输入账号！' }
                ],
                validateFirst: true,
                validateTrigger: 'blur'
              })(
                <Input
                  maxLength={30}
                  placeholder="请输入字母和数字的组合"
                  allowClear
                  disabled={!!this.currentItem.id}
                />
              )
            }
          </Form.Item>
          <Form.Item label="手机号" class={'half'}>
            {
              this.form.getFieldDecorator('mobile', {
                initialValue: this.currentItem.mobile,
                rules: [
                  { required: true, message: '请输入手机号码！' }
                ],
                validateFirst: true,
                validateTrigger: 'blur'
              })(
                <Input
                  placeholder="请输入手机号码！"
                  maxLength={11}
                  allowClear
                  disabled={!!this.currentItem.id}
                />
              )
            }
          </Form.Item>
          {
            !this.currentItem.id
              ? (
                <Form.Item label="密码" class={'half'}>
                  {
                    this.form.getFieldDecorator('password', {
                      initialValue: this.currentItem.password,
                      rules: [
                        {
                          required: true,
                          message: '请输入密码！'
                        }
                      ],
                      validateTrigger: 'blur'
                    })(
                      <Input
                        placeholder="请输入密码"
                        maxLength={30}
                        allowClear
                      />
                    )
                  }
                </Form.Item>
              )
              : null
          }
          <Form.Item label="姓名" class={'half'}>
            {
              this.form.getFieldDecorator('contactName', { initialValue: this.currentItem.contactName })(
                <Input
                  placeholder="请输入姓名"
                  maxLength={20}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="职位" class={'half'}>
            {
              this.form.getFieldDecorator('position', { initialValue: this.currentItem.position })(
                <Input
                  placeholder="请输入职位"
                  maxLength={20}
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="邮箱" class={'half'}>
            {
              this.form.getFieldDecorator('email', {
                initialValue: this.currentItem.email,
                rules: [{ validator: verifyEmail }],
                validateTrigger: 'blur'
              })(
                <Input
                  placeholder="请输入邮箱"
                  maxLength={30}
                  allowClear
                />
              )
            }
          </Form.Item>
          {/*<Form.Item label="状态">*/}
          {/*  {*/}
          {/*    this.form.getFieldDecorator(*/}
          {/*      'status',*/}
          {/*      { initialValue: Number.isInteger(this.currentItem.status) ? this.currentItem.status : 1 }*/}
          {/*    )(*/}
          {/*      <Radio.Group>*/}
          {/*        <Radio value={1}>正常</Radio>*/}
          {/*        <Radio value={0}>冻结</Radio>*/}
          {/*        <Radio value={-2} disabled>删除</Radio>*/}
          {/*        <Radio value={-1} disabled>禁止登录</Radio>*/}
          {/*        <Radio value={2} disabled>未通过</Radio>*/}
          {/*      </Radio.Group>*/}
          {/*    )*/}
          {/*  }*/}
          {/*</Form.Item>*/}
          <Form.Item label="角色">
            {
              this.form.getFieldDecorator(
                'merchantSysRoleIdList',
                { initialValue: this.currentItem.merchantSysRoleIdList || [] }
              )(
                <Select
                  placeholder="请选择角色"
                  allowClear
                  loading={this.roles.loading}
                  mode="multiple"
                  filterOption={this.filterOption}
                >
                  {
                    this.roles.list.map(store => (
                      <Select.Option value={store.id}>{store.roleName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="门店">
            {
              this.form.getFieldDecorator(
                'merchantStoreIdList',
                { initialValue: this.currentItem.merchantStoreIdList || [] }
              )(
                <Select
                  placeholder="请选择门店"
                  allowClear
                  loading={this.stores.loading}
                  mode="multiple"
                  filterOption={this.filterOption}
                >
                  {
                    this.stores.list.map(store => (
                      <Select.Option value={store.id}>{store.storeName}</Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
