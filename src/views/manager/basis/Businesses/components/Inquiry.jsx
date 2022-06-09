import { Button, Form, Input, Select, Space } from 'ant-design-vue'
import searchForm from '@/mixins/searchForm'
import { mapActions, mapState } from 'vuex'
import '../assets/styles/index.scss'

export default Form.create({})({
  mixins: [searchForm],
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
        class="tg-inquiry bn-search-form"
      >
        <Space>
          <Form.Item>
            {
              this.form.getFieldDecorator('pageName')(
                <Input placeholder="企业名称/机构代码" allowClear />
              )
            }
          </Form.Item>
          <Form.Item>
            {
              this.form.getFieldDecorator('allPath')(
                <Input placeholder="负责人/手机号码" allowClear />
              )
            }
          </Form.Item>
          <Form.Item>
            {
              this.form.getFieldDecorator('appId')(
                <Select placeholder="请选择企业类型" allowClear>
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
            {
              this.form.getFieldDecorator('appId')(
                <Select placeholder="请选择企业状态" allowClear>
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
          {/*<Form.Item>*/}
          {/*  <Space>*/}
          {/*    <Button*/}
          {/*      loading={this.loading}*/}
          {/*      htmlType="submit"*/}
          {/*      type="primary"*/}
          {/*      icon="search"*/}
          {/*    >*/}
          {/*      搜索*/}
          {/*    </Button>*/}
          {/*    <Button onClick={this.onClear} icon="reload">重置</Button>*/}
          {/*  </Space>*/}
          {/*</Form.Item>*/}
        </Space>
      </Form>
    )
  }
})
