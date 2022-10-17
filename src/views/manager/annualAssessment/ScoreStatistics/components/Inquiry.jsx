import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import '../assets/styles/index.scss'
import { mapGetters } from 'vuex'

export default Form.create({})({
  mixins: [forInquiry()],
  computed: {
    ...mapGetters({ getState: 'getState' }),
    questionnaires() {
      return this.getState('list', this.moduleName)
    },
    loading() {
      return this.getState('loading', this.moduleName)
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
            this.form.getFieldDecorator('objName')(
              <Input placeholder={'企业名称'} />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('reportName')(
              <Input placeholder={'报表名称'} />
            )
          }
        </Form.Item>
        <Form.Item>
          {
            this.form.getFieldDecorator('auditStatus')(
              <Select placeholder={'审核状态'}>
                <Select.Option value={1}>通过</Select.Option>
                <Select.Option value={2}>待审核</Select.Option>
                <Select.Option value={3}>驳回</Select.Option>
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
