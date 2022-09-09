import './index.scss'
import BNContainer from '@/components/BNContainer'
import { Button, Form, Input } from 'ant-design-vue'
import Upload from '@/components/BNUploadPictures'
import { mapAction, mapState } from '@/utils/store'

export default Form.create({})({
  inject: ['moduleName'],
  data() {
    return {}
  },
  computed: { ...mapState(['formLoading']) },
  methods: {
    onSubmit() {
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (err) return

        const payload = { ...values }

        payload.imgs = payload.imgs
          .map(item => {
            return item.response.data[0].key
          })
          .join(',')
        const res = await this.addRepair(payload)

        if (res.status) {
          this.form.resetFields()
        }
      })
    },
    ...mapAction(['addRepair'])
  },
  render() {
    return (
      <BNContainer class="bn-repair-form" width="100%" modalTitle="物业报修">
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="报修项">
            {this.form.getFieldDecorator('repairItem', {
              initialValue: '',
              rules: [
                {
                  required: true, message: '此项必填', trigger: 'blur'
                }
              ]
            })(<Input placeholder="请输入" />)}
          </Form.Item>
          <Form.Item label="描述说明">
            {
              this.form.getFieldDecorator('description', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '此项必填',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input.TextArea
                  placeholder="请输入"
                  autoSize={{ minRows: 6 }}
                />
              )
            }
          </Form.Item>
          <Form.Item label="图片说明">
            {this.form.getFieldDecorator('imgs', {
              initialValue: [],
              rules: [
                {
                  required: true, type: 'array', message: '此项必填', trigger: 'change'
                }
              ]
            })(<Upload action={'/api/system/upload/image'} limit={10}></Upload>)}
          </Form.Item>
          <Form.Item label=" " colon={false}>
            <Button type="primary" loading={this.formLoading} onclick={() => this.onSubmit()}>
              确认提交
            </Button>
          </Form.Item>
        </Form>
        {/* <Modal visible={this.previewVisible} footer={null} onCancel="handleCancel">
          <img alt="example" style="width: 100%" src={this.previewImage} />
        </Modal> */}
      </BNContainer>
    )
  }
})
