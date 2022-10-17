import { Button, Form, Input, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import '../assets/styles/index.scss'

export default Form.create({})({
  mixins: [forInquiry()],

  methods: {},
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <Form.Item>{this.form.getFieldDecorator('pageName')(<Input
          placeholder="姓名"
          allowClear
        />)}</Form.Item>
        {/* <Form.Item>
            {
              this.form.getFieldDecorator('appId')(
                <Select placeholder="请选择团队" allowClear>
                  {
                    this.allSiteApps.map(item => (
                      <Select.Option value={item.id}>
                        {item.appName}
                      </Select.Option>
                    ))
                  }
                </Select>
              )
            }
          </Form.Item> */}
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
      </Form>
    )
  }
})
