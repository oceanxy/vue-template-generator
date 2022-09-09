import '../assets/styles/index.scss'
import { Form, Input, InputNumber, Radio, Rate, Switch, TreeSelect } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forFormModal()],
  data() {
    return { modalProps: { width: 810 } }
  },
  computed: {
    ...mapGetters({ getState: 'getState' }),
    organizationTree() {
      return this.getState('organizationTree', 'common')
    }
  },
  watch: {
    visible: {
      immediate: true,
      async handler(value) {
        if (value) {
          await this.$store.dispatch('common/getOrganizationTree')
        }
      }
    }
  },
  render() {
    const attributes = {
      attrs: this.modalProps,
      on: {
        cancel: () => this.onCancel(),
        ok: () => this.onSubmit()
      }
    }

    // 回显图片
    const fileList = []

    if (this.currentItem.headPortrait) {
      fileList.push({
        uid: 'headPortrait',
        url: this.currentItem.headPortraitStr,
        key: this.currentItem.headPortrait,
        status: 'done',
        name: this.currentItem.headPortrait?.substring(this.currentItem.headPortrait?.lastIndexOf('/'))
      })
    }

    return (
      <DragModal {...attributes}>
        <Form
          class="bnm-form-grid"
          colon={false}
        >
          <Form.Item label="头像">
            {
              this.form.getFieldDecorator('headPortrait', { initialValue: fileList })(
                <BNUploadPictures limit={1} />
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
                    message: '请输入姓名!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder="请输入姓名" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="所在组织" class={'half'}>
            {
              this.form.getFieldDecorator('organId', {
                initialValue: this.currentItem.organId,
                rules: [
                  {
                    required: true,
                    message: '请选择所在组织!',
                    trigger: 'blur'
                  }
                ]
              })(
                <TreeSelect
                  showSearch
                  allowClear
                  dropdownClassName={'bnm-select-dropdown'}
                  treeData={this.organizationTree}
                  replaceFields={{
                    children: 'children',
                    title: 'name',
                    key: 'id',
                    value: 'id'
                  }}
                  treeDefaultExpandedKeys={[this.organizationTree?.[0]?.id, this.currentItem.organId]}
                  treeNodeFilterProp={'title'}
                  searchPlaceholder={'请输入关键字以搜索'}
                  placeholder={'请选择所在组织'}
                />
              )
            }
          </Form.Item>
          {
            !this.currentItem.id ? [
              <Form.Item label="登录账号" class={'half'}>
                {
                  this.form.getFieldDecorator('loginName', {
                    initialValue: this.currentItem.loginName,
                    rules: [
                      {
                        required: true,
                        message: '请输入登录账号!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <Input placeholder="请输入登录账号" allowClear />
                  )
                }
              </Form.Item>,
              <Form.Item label="登录密码" class={'half'}>
                {
                  this.form.getFieldDecorator('loginPwd', {
                    initialValue: this.currentItem.loginPwd,
                    rules: [
                      {
                        required: true,
                        message: '请输入登录密码!',
                        trigger: 'blur'
                      }
                    ]
                  })(
                    <Input placeholder="请输入登录密码" allowClear />
                  )
                }
              </Form.Item>
            ] : null
          }
          <Form.Item label="性别" class={'half'}>
            {
              this.form.getFieldDecorator('gender', { initialValue: this.currentItem.gender || 0 })(
                <Radio.Group>
                  <Radio value={0}>未知</Radio>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="年龄" class={'half'}>
            {
              this.form.getFieldDecorator('age', { initialValue: this.currentItem.age })(
                <InputNumber placeholder={'请输入年龄'} style={{ width: '100%' }} />
              )
            }
          </Form.Item>
          <Form.Item label="手机号码" class={'half'}>
            {
              this.form.getFieldDecorator('mobile', {
                initialValue: this.currentItem.mobile,
                rules: [
                  {
                    required: true,
                    message: '请输入手机号码!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder="请输入手机号码" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="身份证号" class={'half'}>
            {
              this.form.getFieldDecorator('idCard', { initialValue: this.currentItem.idCard })(
                <Input placeholder="请输入身份证号码" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="电子邮箱" class={'half'}>
            {
              this.form.getFieldDecorator('email', { initialValue: this.currentItem.email })(
                <Input placeholder="请输入电子邮箱" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="服务星级" class={'half'}>
            {
              this.form.getFieldDecorator('serviceStar', { initialValue: this.currentItem.serviceStar })(
                <Rate placeholder="请为服务星级打分" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="简介">
            {
              this.form.getFieldDecorator('description', { initialValue: this.currentItem.description })(
                <Input.TextArea placeholder="请输入简介" autoSize={{ minRows: 6 }} allowClear />
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
                    message: '请输入排序值!',
                    trigger: 'blur'
                  }
                ]
              })(
                <InputNumber style={{ width: '100%' }} placeholder="请输入排序值" />
              )
            }
          </Form.Item>
          <Form.Item label="状态" class={'half'}>
            {
              this.form.getFieldDecorator('status', {
                valuePropName: 'checked',
                initialValue: this.currentItem.id ? this.currentItem.status === 1 : true,
                rules: [
                  {
                    required: true,
                    type: 'boolean',
                    message: '请选择状态!',
                    trigger: 'blur'
                  }
                ]
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
