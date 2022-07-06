import Input from './package/Input'
import Radio from './package/Radio'
import Checkbox from './package/Checkbox'
import Textarea from './package/Textarea'
import ImageUpload from './package/ImageUpload'
import FileUpload from './package/FileUpload'
import Date from './package/Date'
import { Form, Button } from 'ant-design-vue'
import { getRules } from './utils'
export default Form.create({})({
  props: {
    list: Array
  },
  methods: {
    onSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (err) return
        console.log(values)
      })
    }
  },
  render() {
    const getFieldCom = item => {
      let result
      if (item.modType === 1) {
        result = <Radio data={item}></Radio>
      } else if (item.modType === 2) {
        result = <Checkbox data={item}></Checkbox>
      } else if (item.modType === 3) {
        result = <Input data={item}></Input>
      } else if (item.modType === 4) {
        result = <Textarea data={item}></Textarea>
      } else if (item.modType === 5) {
        result = <ImageUpload data={item}></ImageUpload>
      } else if (item.modType === 6) {
        result = <FileUpload data={item}></FileUpload>
      } else if (item.modType === 7) {
        return <Date data={item}></Date>
      }
      return result
    }
    return (
      <Form class="bn-report-form" colon={false} onsubmit={this.onSubmit}>
        {this.list.map(item => (
          <Form.Item label={item.fullName}>
            {this.form.getFieldDecorator(item.id, {
              rules: getRules(item),
              initialValue: ''
            })(getFieldCom(item))}
          </Form.Item>
        ))}
        <Form.Item>
          <Button htmlType="submit" type="primary">
            确认提交
          </Button>
        </Form.Item>
      </Form>
    )
  }
})
