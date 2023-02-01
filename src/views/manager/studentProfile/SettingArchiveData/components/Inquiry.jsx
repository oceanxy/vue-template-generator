import '../assets/styles/index.scss'
import { Button, Form, Input, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  data: () => ({ initialValues: {} }),
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <div class={'row-down'}>
          <Form.Item label={'姓名'}>
            {
              this.form.getFieldDecorator('creatorName', { initialValue: this.initialValues.creatorName })(
                <Input placeholder={'请输入创建人姓名'} />
              )
            }
          </Form.Item>
          <Form.Item label=' ' class={'form-item-btn'}>
            <Space>
              <Button
                loading={this.loading}
                htmlType="submit"
                type="primary"
                icon="search"
              >
                查询
              </Button>
            </Space>
          </Form.Item>
        </div>
      </Form>
    )
  }
})
