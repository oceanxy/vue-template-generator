import './index.scss'
import BNContainer from '@/components/BNContainer'
import { Button, Form, Icon, Input, Modal, Upload } from 'ant-design-vue'

export default Form.create({})({
  data() {
    return {
      fileList: [],
      previewVisible: false,
      previewImage: ''
    }
  },
  render() {
    return (
      <BNContainer
        class="bn-repair-form"
        width="100%"
        title="物业报修"
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item label="报修项">
            {
              this.form.getFieldDecorator('a', {
                initialValue: ''
              })(
                <Input />
              )
            }
          </Form.Item>
          <Form.Item label="描述说明">
            {
              this.form.getFieldDecorator('b', {
                initialValue: ''
              })(
                <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
              )
            }
          </Form.Item>
          <Form.Item label="图片说明">
            {
              this.form.getFieldDecorator('c', {
                initialValue: ''
              })(
                <Upload
                  action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                  listType="picture-card"
                  fileList={this.fileList}
                  onPreview="handlePreview"
                  onChange="handleChange"
                >
                  {
                    this.fileList.length < 8 ? (
                      <div>
                        <Icon type="plus" />
                        <div class="ant-upload-text">
                          点击上传
                        </div>
                      </div>
                    ) : null
                  }
                </Upload>
              )
            }
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary">确认提交</Button>
          </Form.Item>
        </Form>
        <Modal
          visible={this.previewVisible}
          footer={null}
          onCancel="handleCancel"
        >
          <img alt="example" style="width: 100%" src={this.previewImage} />
        </Modal>
      </BNContainer>
    )
  }
})
