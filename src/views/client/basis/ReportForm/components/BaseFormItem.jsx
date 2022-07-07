import Input from './package/Input'
import Radio from './package/Radio'
import Checkbox from './package/Checkbox'
import Textarea from './package/Textarea'
import ImageUpload from './package/ImageUpload'
import FileUpload from './package/FileUpload'
import Date from './package/Date'
import { Form } from 'ant-design-vue'
import BNUploadFile from '@/components/BNUploadFile'
export default {
  props: {
    data: Object,
    form: Object
  },
  render() {
    const getFormItem = () => {
      let result
      const { modType } = this.data
      if (modType === 1) {
        result = <Radio data={this.data} form={this.form}></Radio>
      } else if (modType === 2) {
        result = <Checkbox data={this.data} form={this.form}></Checkbox>
      } else if (modType === 3) {
        result = <Input data={this.data} form={this.form}></Input>
      } else if (modType === 4) {
        result = <Textarea data={this.data} form={this.form}></Textarea>
      } else if (modType === 5) {
        result = <ImageUpload data={this.data} form={this.form}></ImageUpload>
      } else if (modType === 6) {
        result = <FileUpload data={this.data} form={this.form}></FileUpload>
      } else if (modType === 7) {
        result = <Date data={this.data} form={this.form}></Date>
      }
      return result
    }
    return (
      <div>
        {getFormItem()}
        {this.data.itemProveList.length > 0 ? (
          <Form.Item label="佐证材料">
            {this.form.getFieldDecorator(`${this.data.id}_proof`, {
              initialValue: []
            })(
              <BNUploadFile action={'/api/system/upload/image'} limit={this.data.itemProveList.length}></BNUploadFile>
            )}
          </Form.Item>
        ) : null}
      </div>
    )
  }
}
