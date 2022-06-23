import '../assets/styles/index.scss'
import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import forInquiry from '@/mixins/forInquiry'
import { mapActions, mapState } from 'vuex'

export default Form.create({})({
  mixins: [forInquiry()],
  computed: mapState({ allSiteApps: 'allSiteApps' }),
  async created() {
    await this.getAllSiteApps()
  },
  methods: {
    ...mapActions({ getAllSiteApps: 'getAllSiteApps' })
  },
  render() {
    return (
      <Form
        layout="inline"
        onSubmit={this.onSubmit}
        colon={false}
        class="bn-search-form bn-functional-modules-form"
      >
        <Space>
          <Form.Item label="模块名称">
            {
              this.form.getFieldDecorator('moduleName')(
                <Input placeholder="请输入模块名称" allowClear />
              )
            }
          </Form.Item>
          <Form.Item label="所属站点">
            {
              this.form.getFieldDecorator('appId')(
                <Select placeholder="请选择所属站点" allowClear>
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
          </Form.Item>
          <Form.Item>
            <Space>
              <Button
                loading={this.loading}
                htmlType="submit"
                type="primary"
                icon="search"
              >
                搜索
              </Button>
              <Button onClick={this.onClear} icon="reload">重置</Button>
            </Space>
          </Form.Item>
        </Space>
      </Form>
    )
  }
})
