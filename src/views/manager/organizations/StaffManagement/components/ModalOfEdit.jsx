import { Form, Input, InputNumber, Select, Switch, TreeSelect } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import { cloneDeep } from 'lodash'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 810 } }
  },
  computed: {
    search() {
      return this.$store.state[this.moduleName].search
    },
    organizationTree() {
      return this.$store.state[this.moduleName].organizationTree
    },
    roleTree() {
      return this.$store.state[this.moduleName].roleTree
    },
    attributes() {
      return {
        attrs: this.modalProps,
        on: {
          cancel: () => this.onCancel(),
          ok: () => this.onSubmit({
            customDataHandler(value) {
              const data = cloneDeep(value)

              data.roleIds = data.roleIds.join()

              return data
            }
          })
        }
      }
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('getListWithLoadingStatus', {
            moduleName: this.moduleName,
            stateName: 'roleTree',
            customApiName: 'getRoleTree'
          })
        }
      }
    }
  },
  render() {
    return (
      <DragModal {...this.attributes}>
        <Form class="tg-form-grid" colon={false}>
          <Form.Item label="所属组织" class={'half'}>
            {
              this.form.getFieldDecorator('orgId', {
                initialValue: this.currentItem.orgId || this.search.orgId,
                rules: [
                  {
                    required: true,
                    message: '请选择所属组织！',
                    trigger: 'change'
                  }
                ]
              })(
                <TreeSelect
                  showSearch
                  allowClear
                  disabled
                  treeNodeFilterProp={'title'}
                  dropdownClassName={'tg-select-dropdown'}
                  treeData={this.organizationTree.list}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  searchPlaceholder={'请输入关键字以搜索'}
                  placeholder={'请选择所属组织'}
                  treeDefaultExpandedKeys={[this.currentItem.orgId || this.search.orgId]}
                />
              )
            }
          </Form.Item>
          <Form.Item label="组织管理" class={'half'}>
            {
              this.form.getFieldDecorator(
                'isOrganLeader',
                {
                  initialValue: this.currentItem.isOrganLeader || 1,
                  rules: [
                    {
                      required: true,
                      type: 'number',
                      message: '请选择是否组织管理！',
                      trigger: 'change'
                    }
                  ]
                }
              )(
                <Select placeholder="请选择是否组织管理">
                  <Select.Option value={1}>是</Select.Option>
                  <Select.Option value={2}>否</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="角色组">
            {
              this.form.getFieldDecorator('roleIds', {
                initialValue: this.currentItem.roleIds?.split(',') ?? [],
                rules: [
                  {
                    required: true,
                    type: 'array',
                    message: '请选择角色！',
                    trigger: 'change'
                  }
                ]
              })(
                <TreeSelect
                  showSearch
                  allowClear
                  multiple
                  treeNodeFilterProp={'title'}
                  dropdownClassName={'tg-select-dropdown'}
                  treeData={this.roleTree.list}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  searchPlaceholder={'请输入关键字以搜索'}
                  placeholder={'请选择角色'}
                  treeDefaultExpandedKeys={this.currentItem.roleIds?.split(',') ?? []}
                />
              )
            }
          </Form.Item>
          <Form.Item label="姓名" class={'half'}>
            {
              this.form.getFieldDecorator('fullName', {
                initialValue: this.currentItem.fullName,
                rules: [
                  {
                    required: true,
                    message: '请输入职员姓名！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder="请输入职员姓名" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="性别" class={'half'}>
            {
              this.form.getFieldDecorator(
                'gender',
                {
                  initialValue: this.currentItem.gender || 0,
                  rules: [
                    {
                      required: true,
                      type: 'number',
                      message: '请选择性别！',
                      trigger: 'change'
                    }
                  ]
                }
              )(
                <Select placeholder="请选择性别">
                  <Select.Option value={0}>未知</Select.Option>
                  <Select.Option value={1}>男</Select.Option>
                  <Select.Option value={2}>女</Select.Option>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="登录名" class={'half'}>
            {
              this.form.getFieldDecorator('loginName', {
                initialValue: this.currentItem.loginName,
                rules: [
                  {
                    required: true,
                    message: '请输入职员登录名！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder="请输入职员登录名" allowClear />
              )
            }
          </Form.Item>
          {
            !this.currentItem.id
              ? (
                <Form.Item label="密码" class={'half'}>
                  {
                    this.form.getFieldDecorator('loginPwd', {
                      initialValue: this.currentItem.loginPwd,
                      rules: [
                        {
                          required: true,
                          message: '请输入职员登录密码！',
                          trigger: 'blur'
                        }
                      ]
                    })(
                      <Input placeholder="请输入职员登录密码" allowClear type={'password'} />
                    )
                  }
                </Form.Item>
              )
              : null
          }
          <Form.Item label="手机号码" class={'half'}>
            {
              this.form.getFieldDecorator('mobile', {
                initialValue: this.currentItem.mobile,
                rules: [
                  {
                    required: true,
                    message: '请输入手机号码！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input
                  placeholder="请输入手机号码"
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
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="联系电话" class={'half'}>
            {
              this.form.getFieldDecorator('phone', { initialValue: this.currentItem.phone })(
                <Input
                  placeholder="请输入联系电话"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="邮箱" class={'half'}>
            {
              this.form.getFieldDecorator('email', { initialValue: this.currentItem.email })(
                <Input
                  placeholder="请输入邮箱"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="QQ" class={'half'}>
            {
              this.form.getFieldDecorator('qq', { initialValue: this.currentItem.qq })(
                <Input
                  placeholder="请输入QQ号码"
                  allowClear
                />
              )
            }
          </Form.Item>
          <Form.Item label="排序" class={'half'}>
            {
              this.form.getFieldDecorator('sortIndex', {
                initialValue: this.currentItem.sortIndex || 0,
                rules: [
                  {
                    required: true,
                    type: 'number',
                    message: '请输入排序！',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber
                  style={{ width: '100%' }}
                  placeholder="请输入排序"
                />
              )
            }
          </Form.Item>
          <Form.Item label="状态" class={'half'}>
            {
              this.form.getFieldDecorator('status', {
                initialValue: !isNaN(this.currentItem.status) ? this.currentItem.status === 1 : true,
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