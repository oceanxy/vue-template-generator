import Upload from '@/components/BNUploadFile'
import { Form } from 'ant-design-vue'
import { getRules } from '../utils'

export default {
  props: {
    data: Object,
    form: Object
  },
  render() {
    return (
      <Form.Item label={this.data.fullName}>
        {this.form.getFieldDecorator(this.data.id, {
          initialValue: [],
          rules: getRules(this.data)
        })(<Upload action={'/api/system/upload/file'} limit={5}></Upload>)}
      </Form.Item>
    )
  }
}
