import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import '../assets/styles/index.scss'

export default Form.create({})({
  mixins: [forInquiry()],
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry bn-search-form"
      >
        <Space>
          <Form.Item>
            {
              this.form.getFieldDecorator('pageName')(
                <Input placeholder="企业名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item>
            {
              this.form.getFieldDecorator('pageName1')(
                <Input placeholder="场地名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item>
            {
              this.form.getFieldDecorator('appId')(
                <Select placeholder="请选择类型" allowClear>

                </Select>
              )
            }
          </Form.Item>
          <Form.Item>
            {
              this.form.getFieldDecorator('appId')(
                <Select placeholder="请选择状态" allowClear>
                </Select>
              )
            }
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                loading={this.loading}
                htmlType="submit"
                type="primary"
                icon="search"
              >
                查询
              </Button>
              {/*<Button onClick={this.onClear} icon="reload">重置</Button>*/}
            </Space>
          </Form.Item>
        </Space>
      </Form>
    )
  }
})
