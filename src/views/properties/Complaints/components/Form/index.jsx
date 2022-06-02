import './index.scss'
import BNContainer from '@/components/BNContainer'
import { Button, Form, Icon, Input, Radio, Upload } from 'ant-design-vue'
import Modal from '@/mixins/modal'

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
        class="bn-complaints-form"
        width="100%"
        title="投诉建议"
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
        >
          <Form.Item label="投诉类型" class='radio-group'>
            {
              this.form.getFieldDecorator('a', {
                initialValue: ''
              })(
                <Radio.Group>
                  <Radio value={1}>院区管理</Radio>
                  <Radio value={2}>服务质量</Radio>
                  <Radio value={3}>服务态度</Radio>
                  <Radio value={4}>服务效率</Radio>
                </Radio.Group>
              )
            }
          </Form.Item>
          <Form.Item label="投诉内容">
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
                        <div className="ant-upload-text">
                          点击上传
                        </div>
                      </div>
                    ) : null
                  }
                </Upload>
              )
            }
          </Form.Item>
          <Form.Item label=' ' colon={false}>
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
