import '../assets/styles/index.scss'
import { Form, Input, InputNumber, Radio, Select, Switch } from 'ant-design-vue'
import forFormModal from '@/mixins/forModal/forFormModal'
import DragModal from '@/components/DragModal'
import BNUploadPictures from '@/components/BNUploadPictures'
import dynamicState from '@/mixins/dynamicState'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [
    forFormModal(),
    dynamicState({ customModuleName: 'teams' })
  ],
  data() {
    return { modalProps: { width: 810 } }
  },
  computed: {
    ...mapGetters({ getList: 'getList' }),
    teams() {
      return this.getList('teams')
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
              this.form.getFieldDecorator('idCard', {
                initialValue: this.currentItem.idCard,
                rules: [
                  {
                    required: true,
                    message: '请输入身份证号码!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input placeholder="请输入身份证号码" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="所在团队" class={'half'}>
            {
              this.form.getFieldDecorator('teamId', {
                initialValue: this.currentItem.teamId,
                rules: [
                  {
                    required: true,
                    message: '请选择所在团队!',
                    trigger: 'blur'
                  }
                ]
              })(
                <Select placeholder="请选择所在团队">
                  {
                    this.teams.map(item => (
                      <Select.Option value={item.id}>
                        {item.fullName}
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item>
          <Form.Item label="性别" class={'half'}>
            {
              this.form.getFieldDecorator('gender', { initialValue: this.currentItem.gender || 1 })(
                <Radio.Group>
                  <Radio value={1}>男</Radio>
                  <Radio value={2}>女</Radio>
                </Radio.Group>
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
