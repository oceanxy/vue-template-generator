import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import { mapGetters } from 'vuex'

export default Form.create({})({
  // 注册为子模块的组件需要注入的参数
  inject: ['submoduleName'],
  mixins: [forInquiry()],
  computed: {
    ...mapGetters({ getCurrentItem: 'getCurrentItem' }),
    currentItem() {
      return this.getCurrentItem(this.moduleName)
    },
    additionalQueryParameters() {
      return { id: this.currentItem.id }
    }
  },
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
              <Input placeholder="企业名称" allowClear />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('signingStatus')(
              <Select placeholder="请选择签约状态" allowClear>
                <Select.Option value={1}>签约中</Select.Option>
                <Select.Option value={2}>已解约</Select.Option>
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
      </Form>
    )
  }
})
