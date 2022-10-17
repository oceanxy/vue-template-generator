import '../assets/styles/index.scss'
import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
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
        <Form.Item>
          {
            this.form.getFieldDecorator('companyName')(
              <Input
                placeholder="企业名称"
                allowClear
              />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('signerName')(
              <Input
                placeholder="签约人"
                allowClear
              />)
          }
        </Form.Item>
        {/* <Form.Item>
            {
              this.form.getFieldDecorator('appId')(
                <Select placeholder="是否优惠" allowClear>
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
          {
            this.form.getFieldDecorator('signingStatus')(
              <Select
                placeholder="合同状态"
                allowClear
              >
                <Select.Option value={1}>签约中</Select.Option>
                <Select.Option value={2}>待审核</Select.Option>
                <Select.Option value={3}>已签约</Select.Option>
                <Select.Option value={4}>审核驳回</Select.Option>
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
        <Functions />
      </Form>
    )
  }
})
