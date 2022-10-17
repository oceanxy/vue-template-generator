import { Button, Form, Input, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import '../assets/styles/index.scss'
import Functions from './Functions'

export default Form.create({})({
  mixins: [forInquiry()],
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="tg-inquiry"
      >
        <Form.Item>{this.form.getFieldDecorator('catName')(<Input
          placeholder="文章类别名称"
          allowClear
        />)}</Form.Item>
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
        <Functions></Functions>
      </Form>
    )
  }
})
