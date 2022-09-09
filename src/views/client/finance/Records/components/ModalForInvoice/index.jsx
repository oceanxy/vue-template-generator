import './index.scss'
import { Form, Input } from 'ant-design-vue'
import forModal from '@/mixins/forModal'
import DragModal from '@/components/DragModal'

export default Form.create({})({
  mixins: [forModal()],
  data() {
    return {
      visibleField: 'showModalForInvoice',
      modalProps: {width: 600}
    }
  },
  watch: {
    async visible(value) {
      if (value) {
        //
      }
    }
  },
  render() {
    const attributes = {
      attrs: {...this.modalProps},
      on: {cancel: () => this.onCancel('showModalForInvoice')}
    }

    return (
      <DragModal {...attributes}>
        <Form
          layout="horizontal"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          onSubmit={this.onSubmit}
          class="records-invoice-form">
          <Form.Item label="发票金额">
            <span class="invoice-amount">￥{this.currentItem.fp}</span>
          </Form.Item>
          <Form.Item label="发票抬头">
            {this.form.getFieldDecorator('tt', {
              initialValue: this.currentItem.tt,
              rules: [{
                required: true, message: '请输入发票抬头', trigger: 'blur' 
              }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="纳税人识别号">
            {this.form.getFieldDecorator('nsr', {
              initialValue: this.currentItem.nsr,
              rules: [{
                required: true, message: '请输入纳税人识别号', trigger: 'blur' 
              }]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="电话">
            {this.form.getFieldDecorator('tel', {initialValue: this.currentItem.tel})(<Input />)}
          </Form.Item>
          <Form.Item label="通信地址">
            {this.form.getFieldDecorator('address', {initialValue: this.currentItem.address})(<Input />)}
          </Form.Item>
          <Form.Item label="开户银行">
            {this.form.getFieldDecorator('kh', {initialValue: this.currentItem.kh})(<Input />)}
          </Form.Item>
          <Form.Item label="银行账号">
            {this.form.getFieldDecorator('acc', {initialValue: this.currentItem.acc})(<Input />)}
          </Form.Item>
          <Form.Item label="备注">
            {this.form.getFieldDecorator('remark', {initialValue: this.currentItem.remark})(<Input />)}
          </Form.Item>
          <Form.Item label="接收邮箱">
            {this.form.getFieldDecorator('email', {initialValue: this.currentItem.address})(<Input />)}
          </Form.Item>
        </Form>
      </DragModal>
    )
  }
})
