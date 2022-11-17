import { Button, Form, Input, Select, Space, Spin } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'

export default Form.create({})({
  mixins: [forInquiry()],
  computed: {
    search() {
      return this.$store.state[this.moduleName].search
    }
  },
  methods: {
    handleSubmit(e) {
      this.onSubmit(
        e,
        {
          activityId: this.search.activityId,
          schoolTypes: this.search.schoolTypes,
          range: this.search.range
        },
        {
          isResetSelectedRows: false,
          customApiName: 'getStudentsOfHeightOfStatistical'
        }
      )
    }
  },
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={e => this.handleSubmit(e)}
        colon={false}
        class="tg-inquiry"
      >
        <Form.Item label={'学生名称'}>
          {
            this.form.getFieldDecorator('fullName')(
              <Input placeholder={'请输入学生名称'} allowClear />
            )
          }
        </Form.Item>
        <Space class={'btn-group'}>
          <Button
            loading={this.loading}
            htmlType="submit"
            type="primary"
            icon="search"
          >
            搜索
          </Button>
          {/*<Button onClick={this.onClear} icon="reload">重置</Button>*/}
        </Space>
      </Form>
    )
  }
})
