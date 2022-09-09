import './index.scss'
import BNContainer from '@/components/BNContainer'
import { Button, Form, Input, Radio } from 'ant-design-vue'
import Upload from '@/components/BNUploadPictures'
import { mapAction, mapState } from '@/utils/store'

export default Form.create({})({
  inject: ['moduleName', 'complaintsTypeEnum'],
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
        const res = await this.addPropertyComplaints(payload)

        if (res.status) {
          this.form.resetFields()
        }
      })
    },
    ...mapAction(['addPropertyComplaints'])
  },
  render() {
    const complaintsTypeEnum = Object.keys(this.complaintsTypeEnum)

    return (
      <BNContainer class="bn-complaints-form" width="100%" modalTitle="投诉建议">
        <Form labelCol={{ span: 4 }} wrapperCol={{ span: 20 }}>
          <Form.Item label="投诉类型" class="radio-group">
            {this.form.getFieldDecorator('complaintType', {
              rules: [
                {
                  required: true, type: 'number', message: '此项必填', trigger: 'change'
                }
              ]
            })(
              <Radio.Group>
                {complaintsTypeEnum.map(item => {
                  return <Radio value={+item}>{this.complaintsTypeEnum[item]}</Radio>
                })}
              </Radio.Group>
            )}
          </Form.Item>
          <Form.Item label="投诉内容">
            {
              this.form.getFieldDecorator('content', {
                initialValue: '',
                rules: [
                  {
                    required: true,
                    message: '请输入投诉内容！',
                    trigger: 'blur'
                  }
                ]
              })(
                <Input.TextArea autoSize={{ minRows: 6 }} placeholder={'请输入投诉内容'} />
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
            <Button type="primary" onclick={() => this.onSubmit()}>
              确认提交
            </Button>
          </Form.Item>
        </Form>
      </BNContainer>
    )
  }
})
