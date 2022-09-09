import Input from './package/Input'
import Radio from './package/Radio'
import Checkbox from './package/Checkbox'
import Textarea from './package/Textarea'
import ImageUpload from './package/ImageUpload'
import FileUpload from './package/FileUpload'
import Date from './package/Date'
import { Card, Form } from 'ant-design-vue'
import BNUploadFile from '@/components/BNUploadFile'
import BNUploadPictures from '@/components/BNUploadPictures'

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
        result = <Radio data={this.data} form={this.form} />
      } else if (modType === 2) {
        result = <Checkbox data={this.data} form={this.form} />
      } else if (modType === 3) {
        result = <Input data={this.data} form={this.form} />
      } else if (modType === 4) {
        result = <Textarea data={this.data} form={this.form} />
      } else if (modType === 5) {
        result = <ImageUpload data={this.data} form={this.form} />
      } else if (modType === 6) {
        result = <FileUpload data={this.data} form={this.form} />
      } else if (modType === 7) {
        result = <Date data={this.data} form={this.form} />
      }

      return result
    }

    const getProveType = item => {
      if (item.fileType === 1) {
        return <BNUploadFile action={'/api/system/upload/file'} accept=".pdf" limit={1} />
      } else {
        return <BNUploadPictures action={'/api/system/upload/image'} limit={1} />
      }
    }

    return (
      <Card class="bn-report-form-card">
        {getFormItem()}
        {
          this.data.itemProveList.map(item => (
            <Form.Item label={`${item.fullName}`}>
              {
                this.form.getFieldDecorator(`${item.id}_proof`, {
                  initialValue: [],
                  rules: [
                    {
                      required: !!item.isMust,
                      type: 'array',
                      message: '请上传佐证材料',
                      trigger: 'change'
                    }
                  ]
                })(
                  getProveType(item)
                )
              }
            </Form.Item>
          ))
        }
      </Card>
    )
  }
}
