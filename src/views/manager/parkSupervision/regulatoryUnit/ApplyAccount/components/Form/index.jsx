import { Form, Input } from 'ant-design-vue'

export default Form.create({})({
  render() {
    return (
      <Form class={'apply-account-form bnm-form-grid'}>
        <Form.Item label={'所属组织'}>
          {
            this.form.getFieldDecorator('a', {
              initialValue: 0
            })(
              <Input placeholder={'请选择组织机构'} />
            )
          }
        </Form.Item>
        <Form.Item label={'申请账号'} class={'half'}>
          {
            this.form.getFieldDecorator('b', {
              initialValue: 0
            })(
              <Input placeholder={'请输入'} />
            )
          }
        </Form.Item>
        <Form.Item label={'登录密码'} class={'half'}>
          {
            this.form.getFieldDecorator('c', {
              initialValue: 0
            })(
              <Input placeholder={'请输入'} type={'password'} />
            )
          }
        </Form.Item>
        <Form.Item label={'角色'} class={'half'}>
          {
            this.form.getFieldDecorator('b', {
              initialValue: 0
            })(
              <Input placeholder={'请输入'} />
            )
          }
        </Form.Item>
        <Form.Item label={'名称'} class={'half'}>
          {
            this.form.getFieldDecorator('c', {
              initialValue: 0
            })(
              <Input placeholder={'请输入'} type={'password'} />
            )
          }
        </Form.Item>
        <Form.Item label={'联系人'} class={'half'}>
          {
            this.form.getFieldDecorator('b', {
              initialValue: 0
            })(
              <Input placeholder={'请输入'} />
            )
          }
        </Form.Item>
        <Form.Item label={'手机号码'} class={'half'}>
          {
            this.form.getFieldDecorator('c', {
              initialValue: 0
            })(
              <Input placeholder={'请输入'} type={'password'} />
            )
          }
        </Form.Item>
        <Form.Item label={'联系地址'} class={'custom'}>
          <Form.Item>
            {
              this.form.getFieldDecorator('b', {
                initialValue: 0
              })(
                <Input placeholder={'请输入'} />
              )
            }
          </Form.Item>
          <Form.Item>
            {
              this.form.getFieldDecorator('b', {
                initialValue: 0
              })(
                <Input placeholder={'请输入'} />
              )
            }
          </Form.Item>
        </Form.Item>
        <Form.Item label={'申请说明'}>
          {
            this.form.getFieldDecorator('b', {
              initialValue: 0
            })(
              <Input placeholder={'请输入'} />
            )
          }
        </Form.Item>
      </Form>
    )
  }
})
